import { Component, Input, OnInit } from '@angular/core';
import * as THREE from 'three';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';

@Component({
  selector: 'app-name',
  template: '',
  styleUrls: ['./name.component.scss']
})

export class NameComponent implements OnInit {

  @Input() camera!: THREE.PerspectiveCamera;
  @Input() renderer!: THREE.WebGLRenderer;
  @Input() scene!: THREE.Scene;

  private name!: THREE.Mesh;
  private star01!: THREE.Mesh;
  private light01!: THREE.PointLight;
  private star02!: THREE.Mesh;
  private light02!: THREE.PointLight;
  private star03!: THREE.Mesh;
  private light03!: THREE.PointLight;

  ngOnInit() {

    this.initNameMesh();
    this.initStar01Mesh();
    this.initStar02Mesh();
    this.initStar03Mesh();
    this.animate();

  }

  private initNameMesh(): void {

    const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
    this.name = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), material);

    new FontLoader().load('https://s7rg77.com/fonts/nes.json', (font) => {

      this.name.geometry = new TextGeometry('Sergio\nLópez', {
        font,
        size: 2.5,
        depth: 1
      });

      this.name.geometry.center();
      this.scene.add(this.name);

    });

  }

  private initStar01Mesh(): void {

    this.star01 = new THREE.Mesh(
      new THREE.SphereGeometry(0.5, 16, 8),
      new THREE.MeshBasicMaterial({ color: 0x00ffff })
    );

    this.light01 = new THREE.PointLight(0x00ffff, 10000, 50);
    this.star01.add(this.light01);
    this.scene.add(this.star01);

  }

  private initStar02Mesh(): void {

    this.star02 = new THREE.Mesh(
      new THREE.SphereGeometry(0.5, 16, 8),
      new THREE.MeshBasicMaterial({ color: 0xffff00 })
    );

    this.light02 = new THREE.PointLight(0xffff00, 10000, 50);
    this.star02.add(this.light02);
    this.scene.add(this.star02);

  }

  private initStar03Mesh(): void {

    this.star03 = new THREE.Mesh(
      new THREE.SphereGeometry(0.5, 16, 8),
      new THREE.MeshBasicMaterial({ color: 0x00ff00 })
    );

    this.light03 = new THREE.PointLight(0x00ff00, 10000, 50);
    this.star03.add(this.light03);
    this.scene.add(this.star03);

  }

  private animate(): void {

    requestAnimationFrame(() => this.animate());

    this.updateStar01();
    this.updateStar02();
    this.updateStar03();

    this.renderer.render(this.scene, this.camera);

  }

  private updateStar01(): void {

    const elapsedTime = Date.now() * 0.002;
    const angle = elapsedTime * 0.5;

    const radius = 20;
    const x = Math.sin(angle) * radius;
    const z = Math.cos(angle) * radius;
    const y = Math.sin(angle) * 5;

    this.star01.position.set(x, y, z);
    this.light01.position.copy(this.star01.position);

  }

  private updateStar02(): void {

    const elapsedTime = Date.now() * 0.002;
    const angle = elapsedTime * 0.5 + (2 * Math.PI) / 3;

    const radius = 20;
    const x = Math.sin(angle) * radius;
    const z = Math.cos(angle) * radius;
    const y = Math.sin(angle) * 10;

    this.star02.position.set(x, y, z);
    this.light02.position.copy(this.star02.position);

  }

  private updateStar03(): void {

    const elapsedTime = Date.now() * 0.002;
    const angle = elapsedTime * 0.5 + (4 * Math.PI) / 3;

    const radius = 20;
    const x = Math.sin(angle) * radius;
    const z = Math.cos(angle) * radius;
    const y = Math.sin(angle) * 15;

    this.star03.position.set(x, y, z);
    this.light03.position.copy(this.star03.position);
    
  }

}