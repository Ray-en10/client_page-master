import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-accueil',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './accueil.component.html',
  styleUrl: './accueil.component.scss'
})
export class AccueilComponent implements OnInit {

  images: string[] = [
    '../../assets/imglandpage.jpg',
    'https://img.freepik.com/vecteurs-libre/concept-livraison-design-plat_23-2149146359.jpg?w=996&t=st=1713657407~exp=1713658007~hmac=911aa7c7beedd00953da83285cfba6518dc132f21a3952695372afca88655298', // Replace with actual image URLs
  ];
  text1stligne: string[] = [
    'TUNISIE SECURITE... ',
    'Le Trasport Des Fonds...',
  ];
  text2ndligne: string[] = [
    'Des Moyens Matériels à la point',
    'Et De Valeur',
  ];
  deftn: string[] = [
    'TUNISIE SÉCURITÉ couvre le transport et le traitement de fonds, de chèques bancaires, de titres de paiement, de documents bancaires, de documents confidentiels, de supports informatiques et cartes, etc TUNISIE SÉCURITÉ dispose à cet effet, de moyens matériels et de protection, pour assurer ces tâches dans les meilleures conditions de sécurité en conformité avec la législation actuellement en vigueur, ainsi que d’un personnel de comptage, de triage et de traitement hautement qualifié, réparti sur nos centres forts de Tunis-La Soukra, Nabeul, Sousse, Sfax et Gabès-Djerba.'
  ];
  clients = [
    {
      image: 'https://tunisie-securite.com/wp-content/uploads/2020/07/UIB.png',
      title: '',
    },
    {
      image: 'https://tunisie-securite.com/wp-content/uploads/2020/07/UBCI.png',
      title: '',
    },
    {
      image: 'https://tunisie-securite.com/wp-content/uploads/2020/07/Zitouna-bank.png',
      title: '',
    },
    {
      image: 'https://tunisie-securite.com/wp-content/uploads/2020/08/Decathlon.png',
      title: '',
    },
    {
      image: 'https://tunisie-securite.com/wp-content/uploads/2020/08/SNTRI.png',
      title: '',
    },
    {
      image: 'https://tunisie-securite.com/wp-content/uploads/2020/07/ABC-Bank.png',
      title: '',
    },
    {
      image: 'https://tunisie-securite.com/wp-content/uploads/2020/07/Amen-Bank.png',
      title: '',
    },
    {
      image: 'https://tunisie-securite.com/wp-content/uploads/2020/07/BT.png',
      title: '',
    },
    {
      image: 'https://tunisie-securite.com/wp-content/uploads/2020/07/TIB.png',
      title: '',
    },
    {
      image: 'https://tunisie-securite.com/wp-content/uploads/2020/07/TSB.png',
      title: '',
    },
  ];
  services = [
    {
      image: 'https://img.freepik.com/vecteurs-libre/camion-transport-dessine-main_23-2149166830.jpg?t=st=1717417594~exp=1717418194~hmac=a4fe5621f8119a7a756f708a5ef6a28aa8148edd1c49b32d48c029effbcbe733',
      title: 'Transport de fonds',
      description: 'Le transport ou le convoi de fonds est un type de transport routier, opéré pour le compte d’autrui. Le transport est très sécurisé, les véhicules spécialement aménagés sont accompagnés d’agents de sécurité et/ou policiers.',
      link: 'link-to-service-1'
    },
    {
      image: 'https://tunisie-securite.com/wp-content/uploads/2017/01/MoneySorting_01311.jpg',
      title: 'Appel de fonds',
      description: 'Le traitement de fonds englobe la reconnaissance, les vérifications d’usage, le comptage et le conditionnement des fonds et valeurs ainsi que leur transport de et vers les centres de traitements du Tunisie Sécurité, les points de dessertes des agences, DAB hors sites et clients et les caisses centrales ou régionales de la Banque de Tunisie ainsi que la BCT.',
      link: 'link-to-service-2'
    },
    {
      image: 'https://tunisie-securite.com/wp-content/uploads/2017/01/Chargement-et-d%C3%A9chargement-DAB-1170x567.png',
      title: 'Mise à disposition',
      description: 'TUNISIE SÉCURITÉ assure l’intégralité de l’opération par mandat et en lieu et place de la Banque. L’appel de fonds est commandé par le vis à vis à la banque, il mentionne le montant par type de billets et par nombre pour chaque type. TUNISIE SÉCURITÉ couvre sous camera toutes les opérations de préparation des fonds destinés au DAB en exposant les références de la caissette, les paquets de façon à pouvoir compter le nombre de liasses contenues dans la caissette et l’acte de son plombage. La cassette de chargement est installée, par TUNISIE SÉCURITÉ, dans le DAB sans toucher au plombage, les caissettes de déchargement et de rejets ou rébus qui sont fermées avec plombage seront ouvertes seulement dans le centre du prestataire et sous camera. Le retrait des billets des caissettes de déchargement est effectué en totalité sous camera.',
      link: 'link-to-service-2'
    },
    {
      image: 'https://tunisie-securite.com/wp-content/uploads/2020/08/entete_917x400.jpg',
      title: 'Echange',
      description: 'Pourquoi externaliser la gestion d’un GAB externe ?' + 'Le recours au GAB n’est pas tributaire de l’affiliation à une banque précise, le client cherche la proximité et la facilité.',
      link: 'link-to-service-2'
    },

  ];

  @ViewChild('clientContainerRef', { static: true }) clientContainerRef!: ElementRef;

  ngOnInit() {
    setInterval(() => {
      this.nextImageAutomatic();
    }, 4000); // Change image every 4 seconds
  }

  currentIndex = 0;
  Indexdef = 0;
  isDown = false;
  startX = 0;
  scrollLeft = 0;

  get currentText(): string {
    return this.text1stligne[this.currentIndex];
  }

  get scdtext(): string {
    return this.text2ndligne[this.currentIndex];
  }

  get deftxt(): string {
    return this.deftn[this.Indexdef];
  }

  get currentImage(): string {
    return this.images[this.currentIndex];
  }

  nextImageAutomatic() {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
  }

  nextImageManual() {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
  }

  prevImageManual() {
    this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
  }

  goToImage(index: number) {
    this.currentIndex = index;
  }

  onMouseDown(event: MouseEvent) {
    this.isDown = true;
    this.startX = event.pageX - this.clientContainerRef.nativeElement.offsetLeft;
    this.scrollLeft = this.clientContainerRef.nativeElement.scrollLeft;
  }

  onMouseLeave() {
    this.isDown = false;
  }

  onMouseUp() {
    this.isDown = false;
  }

  onMouseMove(event: MouseEvent) {
    if (!this.isDown) return;
    event.preventDefault();
    const x = event.pageX - this.clientContainerRef.nativeElement.offsetLeft;
    const walk = (x - this.startX) * 3;
    this.clientContainerRef.nativeElement.scrollLeft = this.scrollLeft - walk;
  }
}
