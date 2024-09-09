import { Component, Input } from '@angular/core';

import * as THREE from 'three';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';

@Component({

  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']

})

export class FooterComponent {

  @Input() camera!: THREE.PerspectiveCamera;
  @Input() renderer!: THREE.WebGLRenderer;
  @Input() scene!: THREE.Scene;

  private footer!: THREE.Mesh;

  ngOnInit() {

    this.initFooterMesh();

  }

  private initFooterMesh() {

    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });

    this.footer = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), material);
    this.footer.position.set(0, -260, 0);

    new FontLoader().load('https://s7rg77.com/fonts/nes.json', (font) => {

      this.footer.geometry = new TextGeometry('WEB EN CONSTRUCCIÓN', {

        font,
        size: 1,
        depth: 0

      });

      this.footer.geometry.center();

    });

    this.scene.add(this.footer);

  }

  update(): void {
    this.footer.lookAt(this.camera.position);
  }

}