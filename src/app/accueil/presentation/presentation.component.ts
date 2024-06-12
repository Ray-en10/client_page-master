import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NavbarComponent } from '../../navbar/navbar.component';
import { FooterComponent } from '../../accueil/footer/footer.component';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-presentation',
  standalone: true,
  imports: [NavbarComponent, FooterComponent,CommonModule],
  templateUrl: './presentation.component.html',
  styleUrl: './presentation.component.scss',
})
export class PresentationComponent implements OnInit {
  deftxt: string[] = [
    'Créée en 23 Juin 2009 et implantée en région tunisienne (avec un site d’exploitation situé à La soukra) la société TUNISIE SÉCURITÉ agréée par le Ministère de l’Intérieur depuis le 11 Février 2010 pour le transport de fonds, de bijoux et/ou de métaux précieux, de leur gardiennage et ce jusqu’à la livraison effective.',
    'La nature des prestations faites par la société TUNISIE SÉCURITÉ couvre le transport et le traitement de fonds, de chèques bancaires, de titres de paiement, de documents bancaires, de documents confidentiels, de supports informatiques et cartes, etc TUNISIE SÉCURITÉ dispose à cet effet, de moyens matériels et de protection, pour assurer ces tâches dans les meilleures conditions de sécurité en conformité avec la législation actuellement en vigueur, ainsi que d’un personnel de comptage, de triage et de traitement hautement qualifié, réparti sur nos centres forts de Tunis-La Soukra, Nabeul, Sousse, Sfax et Gabès-Djerba.'
  ];

  @ViewChild('clientContainerRef', { static: true }) clientContainerRef!: ElementRef;

  ngOnInit() {

  }

  currentIndex = 0;
  isDown = false;
  startX = 0;
  scrollLeft = 0;
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
  toggleContent(index: number) {
    this.currentIndex = index;
  }
}
