import { Component, ElementRef, ViewChild, AfterViewInit, HostListener } from '@angular/core';
import * as THREE from 'three';

import { FooterComponent } from '../footer/footer.component';
import { Star01Component } from '../star01/star01.component';
import { Star02Component } from '../star02/star02.component';
import { Planet01Component } from '../planet01/planet01.component';
import { Planet02Component } from '../planet02/planet02.component';
import { GalaxyComponent } from '../galaxy/galaxy.component';

@Component({
  selector: 'app-universe',
  templateUrl: './universe.component.html',
  styleUrls: ['./universe.component.scss']
})

export class UniverseComponent implements AfterViewInit {

  @ViewChild('rendererContainer', { static: true }) rendererContainer!: ElementRef;
  @ViewChild(FooterComponent) footerComponent!: FooterComponent;
  @ViewChild(Planet01Component) planet01Component!: Planet01Component;
  @ViewChild(Planet02Component) planet02Component!: Planet02Component;
  @ViewChild(Star01Component) star01Component!: Star01Component;
  @ViewChild(Star02Component) star02Component!: Star02Component;
  @ViewChild(GalaxyComponent) galaxyComponent!: GalaxyComponent;

  public scene: THREE.Scene;
  public camera: THREE.PerspectiveCamera;
  public renderer: THREE.WebGLRenderer;

  public isAboutMeHidden: boolean = true;
  public isProjectsHidden: boolean = true;

  public aboutMeText: string[][] = [

    Array.from("Hello, Earthlings! I'm Sergio López, your digital cosmos explorer."),
    Array.from("I'm a web and applications developer, recently graduated as a Higher Technician in Web Application Development."),
    Array.from("Aboard my spacecraft, I carry an arsenal of technologies that I’m mastering bit by bit, with lots of enthusiasm and dedication:"),
    Array.from("Frontend: Angular, HTML, CSS, JavaScript, ThreeJS."),
    Array.from("Backend: Java, PHP, SQL, PDO, REST, JSON, XML."),
    Array.from("Database: MySQL, DB4O, phpMyAdmin."),
    Array.from("Other: Swing, Git, Apache, Tomcat."),
    Array.from("I’m looking for new job opportunities where I can contribute my skills and continue learning. If you’re seeking someone who can combine creativity with technical expertise, feel free to contact me."),
    Array.from("Together, we can reach new frontiers and explore the limits of web development."),

  ];

  private currentCharIndex: number = 0;
  private currentLineIndex: number = 0;
  private charDelay: number = 10;

  private isTyping: boolean = false;
  private isDeleting: boolean = false;

  constructor() {

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setClearColor(0x000000);

  }

  ngAfterViewInit(): void {

    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.rendererContainer.nativeElement.appendChild(this.renderer.domElement);

    this.initRandomStars(2500);

    this.camera.position.z = 125;
    this.camera.lookAt(this.scene.position);

    this.animate();

    window.addEventListener('resize', () => {

      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);

    });

  }

  @HostListener('window:scroll', ['$event'])

  onWindowScroll(): void {

    const scrollTop = window.scrollY;
    const rotationFactor = scrollTop * 0.001;
    const yPos = -scrollTop * 0.05;

    this.camera.position.x = 125 * Math.sin(rotationFactor);
    this.camera.position.z = 125 * Math.cos(rotationFactor);
    this.camera.position.y = yPos;

    this.camera.lookAt(new THREE.Vector3(0, yPos, 0));

  }

  private initRandomStars(count: number): void {

    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);

    const yOffset = -200;

    for (let i = 0; i < count; i++) {

      const distance = 225 + Math.random() * 225;
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos(2 * Math.random() - 1);

      const x = distance * Math.sin(phi) * Math.cos(theta);
      const y = yOffset + distance * Math.sin(phi) * Math.sin(theta);
      const z = distance * Math.cos(phi);

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.computeBoundingSphere();

    const material = new THREE.PointsMaterial({ color: 0xffffff, size: 1 });
    const points = new THREE.Points(geometry, material);

    this.scene.add(points);

  }

  private animate(): void {

    requestAnimationFrame(() => this.animate());

    this.planet01Component.update();
    this.planet02Component.update();
    this.star01Component.update();
    this.star02Component.update();
    this.galaxyComponent.update();
    this.footerComponent.update();

    this.renderer.render(this.scene, this.camera);

  }

  toggleAboutMe(): void {

    if (this.isTyping) {
      this.isTyping = false;
    }

    this.isAboutMeHidden = !this.isAboutMeHidden;

    if (!this.isAboutMeHidden) {
      this.startTypingEffect();
    } else {
      this.startDeletingEffect();
    }

  }

  toggleProjects(): void {

    this.isProjectsHidden = !this.isProjectsHidden;

  }

  private startTypingEffect(): void {

    this.isTyping = true;
    this.isDeleting = false;
    this.revealNextChar();

  }

  private revealNextChar(): void {

    if (!this.isTyping) return;

    if (this.currentLineIndex < this.aboutMeText.length) {

      if (this.currentCharIndex < this.aboutMeText[this.currentLineIndex].length) {
        this.currentCharIndex++;
        setTimeout(() => this.revealNextChar(), this.charDelay);
      } else if (this.currentLineIndex < this.aboutMeText.length - 1) {
        this.currentCharIndex = 0;
        this.currentLineIndex++;
        setTimeout(() => this.revealNextChar(), this.charDelay);
      }

    }

  }

  private startDeletingEffect(): void {

    this.isTyping = false;
    this.isDeleting = true;
    this.hideNextChar();

  }

  private hideNextChar(): void {

    if (!this.isDeleting) return;

    if (this.currentCharIndex > 0) {
      this.currentCharIndex--;
      setTimeout(() => this.hideNextChar(), this.charDelay);
    } else if (this.currentLineIndex > 0) {
      this.currentLineIndex--;
      this.currentCharIndex = this.aboutMeText[this.currentLineIndex].length;
      setTimeout(() => this.hideNextChar(), this.charDelay);
    }

  }

  isCharVisible(lineIndex: number, charIndex: number): boolean {
    
    if (!this.isAboutMeHidden) {
      return lineIndex < this.currentLineIndex || (lineIndex === this.currentLineIndex && charIndex < this.currentCharIndex);
    } else {
      return lineIndex < this.currentLineIndex || (lineIndex === this.currentLineIndex && charIndex < this.currentCharIndex);
    }

  }

}