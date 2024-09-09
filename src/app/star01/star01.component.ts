import { Component, Input, OnInit } from '@angular/core';

import * as THREE from 'three';

@Component({

  selector: 'app-star01',
  template: '',
  styleUrls: ['./star01.component.scss']
  
})

export class Star01Component implements OnInit {

  @Input() camera!: THREE.PerspectiveCamera;
  @Input() renderer!: THREE.WebGLRenderer;
  @Input() scene!: THREE.Scene;

  private star!: THREE.Mesh;
  private light!: THREE.PointLight;

  ngOnInit() {

    this.initStar01Mesh();

  }

  private initStar01Mesh(): void {

    this.star = new THREE.Mesh(

      new THREE.SphereGeometry(0.25, 16, 8),
      new THREE.MeshBasicMaterial({ color: 0x00ff00 })

    );

    this.light = new THREE.PointLight(0x00ff00, 125);
    this.star.add(this.light);

    this.scene.add(this.star);
    this.scene.add(this.light);

  }

  update(): void {

    const scrollY = window.scrollY;
    const angle = scrollY * 0.005 + Math.PI;

    const x = Math.sin(angle) * 100 - 40;
    const y = Math.sin(angle) * 10 - 50;
    const z = Math.cos(angle) * 75 + 50;

    this.star.position.set(x, y, z);
    this.light.position.copy(this.star.position);

  }
  
}