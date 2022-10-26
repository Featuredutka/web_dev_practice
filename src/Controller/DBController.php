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
      $modified_user[0]->setPassword($content->password);
      try {
        $this->entityManager->persist($modified_user[0]);
        $this->entityManager->flush();
        return new Response(200);

      } catch (Exception $exception) {
        echo $exception;
        return $exception;
      }
    }
}
