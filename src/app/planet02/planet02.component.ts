import { Component, Input, OnInit } from '@angular/core';

import * as THREE from 'three';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';

@Component({

  selector: 'app-planet02',
  template: '',
  styleUrls: ['./planet02.component.scss']

})

export class Planet02Component implements OnInit {

  @Input() camera!: THREE.PerspectiveCamera;
  @Input() renderer!: THREE.WebGLRenderer;
  @Input() scene!: THREE.Scene;

  private planet!: THREE.Mesh;
  private ring!: THREE.Group;

  ngOnInit() {

    this.initPlanet02Mesh();

  }

  private initPlanet02Mesh(): void {

    this.planet = new THREE.Mesh(

      new THREE.SphereGeometry(2.5, 32, 16),
      new THREE.MeshStandardMaterial({ color: 0xffffff })

    );

    this.planet.position.set(40, -130, -80);

    this.ring = new THREE.Group();
    this.planet.add(this.ring);

    const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });

    new FontLoader().load('https://s7rg77.com/fonts/nes.json', (font) => {

      const text = 'projects()';
      const radius = 5;
      const totalAngle = Math.PI * 2;
      const angleStep = totalAngle / (text.length + 25);

      let currentAngle = 0;

      text.split('').reverse().forEach((letter) => {

        const geometry = new TextGeometry(letter, {

          font,
          size: 0.5,
          depth: 0

        });

        geometry.computeBoundingBox();

        const letterWidth = geometry.boundingBox!.max.x - geometry.boundingBox!.min.x;
        const angle = currentAngle + letterWidth / (2 * Math.PI * radius);
        const letterMesh = new THREE.Mesh(geometry, material);

        letterMesh.position.set(

          Math.cos(angle) * radius, 0, Math.sin(angle) * radius

        );

        letterMesh.rotation.y = -angle + Math.PI / 2;

        const pointLight = new THREE.PointLight(0xff0000, 1);

        pointLight.position.set(0, 0, 0);
        letterMesh.add(pointLight);
        this.ring.add(letterMesh);

        currentAngle += angleStep + letterWidth / (2 * Math.PI * radius);

      });

    });

    this.addToScene();
    
  }

  private addToScene(): void {

    this.scene.add(this.planet);

  }

  update(): void {

    const elapsedTime = Date.now() * 0.00005;

    this.ring.rotation.y = elapsedTime * 20;

  }

}