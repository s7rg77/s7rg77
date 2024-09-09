import { Component, Input, OnInit } from '@angular/core';
import * as THREE from 'three';

@Component({

  selector: 'app-galaxy',
  template: '',
  styleUrls: ['./galaxy.component.scss']
  
})

export class GalaxyComponent implements OnInit {

  @Input() camera!: THREE.PerspectiveCamera;
  @Input() renderer!: THREE.WebGLRenderer;
  @Input() scene!: THREE.Scene;

  private galaxy!: THREE.Group;
  private rings: THREE.Group[] = [];

  ngOnInit() {

    this.initGalaxy();

  }

  private initGalaxy(): void {

    this.galaxy = new THREE.Group();

    const numPoints = 2500;
    const maxDistance = 50;
    const largeStarRatio = 0.05;
    const yellowStarRatio = 0.05;

    for (let i = 0; i < 10; i++) {

      const ring = new THREE.Group();
      this.rings.push(ring);
      this.galaxy.add(ring);

    }

    for (let i = 0; i < numPoints; i++) {

      const distance = Math.sqrt(Math.random()) * maxDistance * Math.sqrt(Math.random());
      const angle = Math.random() * 2 * Math.PI;
      const height = Math.random() * 5 - 2.5;

      const x = distance * Math.cos(angle);
      const y = height;
      const z = distance * Math.sin(angle);

      const isLargeStar = Math.random() < largeStarRatio;
      const isYellowStar = Math.random() < yellowStarRatio;

      const starSize = isLargeStar ? 1 : 0.5;
      const starColor = isYellowStar ? 0xffff00 : 0xffffff;

      const pointMaterial = new THREE.PointsMaterial({ color: starColor, size: starSize });

      const pointGeometry = new THREE.BufferGeometry();
      pointGeometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array([x, y, z]), 3));

      const point = new THREE.Points(pointGeometry, pointMaterial);
      const ringIndex = Math.floor((distance / maxDistance) * 10);

      this.rings[ringIndex].add(point);

    }

    this.galaxy.position.set(-25, -125, 0);
    this.galaxy.rotation.x = THREE.MathUtils.degToRad(30);
    this.galaxy.rotation.z = THREE.MathUtils.degToRad(150);

    this.scene.add(this.galaxy);

  }

  update(): void {

    const elapsedTime = Date.now() * 0.000005;

    this.rings.forEach((ring, index) => {
      ring.rotation.y = elapsedTime * (20 - index * 2);
    });

  }

}