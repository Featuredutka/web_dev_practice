<?php

namespace App\Controller;

use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/api/database', name: 'app_d_b')]
class DBController extends AbstractController
{
    private $entityManager;
    private $userRepository;

    public function __construct(EntityManagerInterface $entityManager, UserRepository $userRepository)
    {
        $this->entityManager = $entityManager;
        $this->userRepository = $userRepository;
    }


    #[Route('/read', name: 'app_d_b')]
    public function index()
    {
        $users = $this->userRepository->findAll();

        $userdatabase = [];

        foreach ($users as $user){
            $userdatabase[] = $user->toArray();
        }
        return $this->json($userdatabase);

    }
}
