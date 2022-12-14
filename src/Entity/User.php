<?php

namespace App\Entity;

use App\Repository\UserRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: UserRepository::class)]
class User
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 50)]
    private ?string $name = null;

    #[ORM\Column(length: 75)]
    private ?string $email = null;

    #[ORM\Column(length: 40)]
    private ?string $password = null;

    #[ORM\Column(length: 60, nullable: true)]
    private ?string $buffer_password = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): self
    {
        $this->email = $email;

        return $this;
    }

    public function getPassword(): ?string
    {
        return $this->password;
    }

    public function setPassword(string $password): self
    {
        $this->password = $password;

        return $this;
    }

    public function getBufferPassword(): ?string
    {
        return $this->buffer_password;
    }

    public function setBufferPassword(?string $buffer_password): self
    {
        $this->buffer_password = $buffer_password;

        return $this;
    }

    public function toArray(){
        return [
            'id' => $this->id, 
            'name' => $this->name, 
            'email' => $this->email, 
            'password' => $this->password
        ];
    }
}
