<?php

namespace App\Controller;

use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use App\Entity\User;
use Exception;
use Symfony\Component\Mailer\Mailer;
use Symfony\Component\Mailer\Transport;
use Symfony\Component\Mime\Email;

#[Route('/api/database', name: 'api_user')]
class DBController extends AbstractController
{
    private $entityManager;
    private $userRepository;

    public function __construct(EntityManagerInterface $entityManager, UserRepository $userRepository)
    {
        $this->entityManager = $entityManager;
        $this->userRepository = $userRepository;
    }


    #[Route('/read', name: 'api_user_read')]
    public function index()
    {
        $users = $this->userRepository->findAll();
        
        $userdatabase = [];

        foreach ($users as $user){
            $userdatabase[] = $user->toArray();
        }
        return $this->json($userdatabase);

    }

    #[Route('/create', name: 'api_user_create')]
    public function create(Request $request)
    {
      $content = json_decode($request->getContent());
    //   echo $content->name;
      $user = new User();
      $user->setName($content->name);
      $user->setEmail($content->email);
      $user->setPassword($content->password);
      try {
        $this->entityManager->persist($user);
        $this->entityManager->flush();
        return new Response(200);

      } catch (Exception $exception) {
        echo $exception;
        return $exception;
      }
    //   return new Response($content->name);
    }

    #[Route('/update', name: 'api_user_update')]
    public function update(Request $request)
    {
      $content = json_decode($request->getContent());
      $modified_user = $this->userRepository->findBy(array('email'=>$content->email));
      $modified_user[0]->setPassword($content->confirm_password);
      
      $html = <<<HTMLBody
      <h2>Password restoration</h2>

      You have requested a password restoration for $content->email
      <br />
      Here's a link to follow to complete the procedure:
      <br />
      <a href="http://127.0.0.1:8000/api/database/password_reset?newpass=$content->password&curpass=$content->confirm_password&user=$content->email">Click to update password</a>
      
      HTMLBody;

      $email = (new Email())
              ->from("support@breitenstein.de")
              ->to("featuredboogie@gmail.com")
              ->subject("Password restoration")
              ->text("Your")
              ->html($html);

      $dsn = "smtp://localhost:1025";
      $transport = Transport::fromDsn($dsn);
      $mailer = new Mailer($transport);

      try { 
        $this->entityManager->persist($modified_user[0]);
        $this->entityManager->flush();
        $mailer->send($email);


        return new Response(200);

      } catch (Exception $exception) {
        echo $exception;
        return $exception;
      }
    }

    #[Route('/mail_confirmation', name: 'api_user_send_mail')]
    public function send_mail(Request $request)
    {
      $content = json_decode($request->getContent());

      $token = random_int(12345678, 99999999);
      
      $html = <<<HTMLBody
      <h2>Password restoration</h2>

      You have requested a password restoration for {email will be here}
      <br />
      Here's a link to follow to complete the procedure:
      <br />
      <a href="http://127.0.0.1:8000/api/database/password_reset?newpass=123456789&curpass=123123123">Click to update password</a>
      <br />
      Your password restoration token is === {$token} 
      
      HTMLBody;
      
      $email = (new Email())
              ->from("support@breitenstein.de")
              ->to("featuredboogie@gmail.com")
              ->subject("Password restoration")
              ->text("Your password restoration token is - $token")
              ->html($html);

      $dsn = "smtp://localhost:1025";
      $transport = Transport::fromDsn($dsn);
      $mailer = new Mailer($transport);
      
      try {
        $mailer->send($email);
        return new Response(200);

      } catch (Exception $exception) {
        echo $exception;
        return $exception;
      }
    }

    #[Route('/password_reset', name: 'api_user_reset_password')]
    public function update_password(Request $request)
    {
      // echo $_GET['newpass'], PHP_EOL;
      // echo $_GET['curpass'], PHP_EOL;
      // echo $_GET['user'], PHP_EOL;

      $user = $_GET['user'];
      $buffer_password = $_GET['curpass'];
      $new_password = $_GET['newpass'];

      $modified_user = $this->userRepository->findBy(array('email'=>$user));
      if ($modified_user[0]->getPassword() === $buffer_password){
        $modified_user[0]->setPassword($new_password);
      } else {
        echo "ERROR - LINK WAS ALREADY USED OR ANOTHER ERROR OCCURED";
        // echo $modified_user[0]->getPassword(), PHP_EOL;
        // echo $buffer_password, PHP_EOL;
      }
      
      try { 
        $this->entityManager->persist($modified_user[0]);
        $this->entityManager->flush();
        return new Response(200);

      } catch (Exception $exception) {
        echo $exception;
        return $exception;
      }



      return new Response();
      
    }


}
