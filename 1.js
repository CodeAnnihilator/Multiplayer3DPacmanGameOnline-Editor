console.clear();
window.addEventListener('load', function() {
    if (!Detector.webgl) Detector.addGetWebGLMessage();

    var w = window.innerWidth,
        h = window.innerHeight / 2;

    var container, renderer, scene, camera, controls, children;
    var raycaster, mouse = new THREE.Vector2(),
        INTERSECTED, bbox;

    var container2, renderer2, cam2, controls2, camHelper, stats, isDown = false,
        isDragging = false;

    (function init() {
        // renderer
        renderer = new THREE.WebGLRenderer({
            antialias: true
        });
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(w, h);
        container = document.getElementById('container');
        container.appendChild(renderer.domElement);

        renderer2 = new THREE.WebGLRenderer({
            antialias: true
        });
        renderer2.setPixelRatio(window.devicePixelRatio);
        renderer2.setSize(w, h);
        container2 = document.getElementById('container2');
        container2.appendChild(renderer2.domElement);
        stats = new Stats();
        container2.appendChild(stats.dom);
        stats.dom.style.position = 'absolute';

        // world
        scene = new THREE.Scene();
        scene.fog = new THREE.FogExp2(0x1E2630, 0.002);
        renderer.setClearColor(scene.fog.color);
        renderer2.setClearColor(scene.fog.color);

        // camera
        camera = new THREE.PerspectiveCamera(60, w / h, 1, 2000);
        camera.position.x = 140;
        camera.position.y = 55;
        camera.position.z = 140;
        camera.lookAt(new THREE.Vector3(0, 0, 0));
        camHelper = new THREE.CameraHelper(camera);
        scene.add(camHelper);
        controls = new THREE.OrbitControls(camera, renderer.domElement);

        cam2 = new THREE.PerspectiveCamera(60, w / h, 1, 2000);
        cam2.position.x = 0;
        cam2.position.y = 100;
        cam2.position.z = 400;
        cam2.lookAt(new THREE.Vector3(0, 0, 0));
        controls2 = new THREE.OrbitControls(cam2, renderer2.domElement);

        // helpers
        var axes = new THREE.AxisHelper(50);
        scene.add(axes);
        var gridXZ = new THREE.GridHelper(500, 10);
        scene.add(gridXZ);

        // lights
        light = new THREE.DirectionalLight(0xffffff);
        light.position.set(1, 1, 1);
        scene.add(light);
        light = new THREE.DirectionalLight(0x002288);
        light.position.set(-1, -1, -1);
        scene.add(light);
        light = new THREE.AmbientLight(0x222222);
        scene.add(light);

        children = new THREE.Object3D();

        var material = new THREE.MeshPhongMaterial({
            color: 0xfb3550,
            shading: THREE.FlatShading
        });
        // Dome
        geometry = new THREE.IcosahedronGeometry(700, 1);
        var domeMaterial = new THREE.MeshPhongMaterial({
            color: 0xfb3550,
            shading: THREE.FlatShading,
            side: THREE.BackSide
        });
        var dome = new THREE.Mesh(geometry, domeMaterial);
        scene.add(dome);

        //sphere
        geometry = new THREE.SphereGeometry(15, 10, 6);
        var sphere = new THREE.Mesh(geometry, material.clone());
        sphere.position.set(-60, 15, -50);
        children.add(sphere);

        //cylinder
        geometry = new THREE.CylinderGeometry(0, 20, 40, 20);
        var cylinder = new THREE.Mesh(geometry, material.clone());
        cylinder.position.set(-90, 20, 30);
        children.add(cylinder);

        //Dodecahedron
        geometry = new THREE.DodecahedronGeometry(20, 0);
        var dodecahedron = new THREE.Mesh(geometry, material.clone());
        dodecahedron.position.set(10, 20, -30);
        children.add(dodecahedron);

        scene.add(children);

        raycaster = new THREE.Raycaster();
        var geometry = new THREE.BoxGeometry(1, 1, 1);
        var material = new THREE.MeshBasicMaterial({
            color: 0x00ff00
        });
        var cube = new THREE.Mesh(geometry, material);
        bbox = new THREE.BoxHelper(cube);
        scene.add(bbox);

        window.addEventListener('resize', onWindowResize, false);
        container.addEventListener('mousemove', onMouseMove, false);
        container.addEventListener('mousedown', onMouseDown, false);
        container.addEventListener('mouseup', onMouseUp, false);
        container.addEventListener('click', onClick, false);
    })();

    function onWindowResize() {
        w = window.innerWidth;
        h = window.innerHeight / 2;

        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);

        cam2.aspect = w / h;
        cam2.updateProjectionMatrix();
        renderer2.setSize(w, h);
    }

    function onMouseMove(event) {
        event.preventDefault();
        if (isDown) isDragging = true;

        if (!isDragging) {
            mouse.x = (event.clientX / w) * 2 - 1;
            mouse.y = -(event.clientY / h) * 2 + 1;

            raycaster.setFromCamera(mouse, camera);
            var intersects = raycaster.intersectObjects(children.children);
            if (intersects.length > 0) {
                if (INTERSECTED != intersects[0].object) {
                    if (INTERSECTED) INTERSECTED.material.emissive.setHex(INTERSECTED.currentHex);
                    INTERSECTED = intersects[0].object;
                    bbox.update(INTERSECTED);
                    INTERSECTED.currentHex = INTERSECTED.material.emissive.getHex();
                    INTERSECTED.material.emissive.setHex(0xffff00);
                    container.style.cursor = 'pointer';
                }
            } else {
                if (INTERSECTED) INTERSECTED.material.emissive.setHex(INTERSECTED.currentHex);
                INTERSECTED = null;
                container.style.cursor = 'auto';
            }
        }
    }

    function onClick(event) {
        event.preventDefault();
        if (!isDragging && INTERSECTED) {
            var bsphere = bbox.geometry.boundingSphere;
            var centroid = bsphere.center;
            controls.target.copy(centroid);
            controls.update();
            // camera.position.setY( centroid.y );
            camera.position.sub(centroid).normalize().multiplyScalar(bsphere.radius * 1.7).add(centroid);
            controls.update();
        }
    }

    function onMouseDown(event) {
        event.preventDefault();
        isDown = true;
    }

    function onMouseUp(event) {
        event.preventDefault();
        isDown = false;
        isDragging = false;
    }

    (function animate() {
        requestAnimationFrame(animate);

        camHelper.visible = false;
        bbox.visible = false;
        renderer.render(scene, camera);

        camHelper.visible = true;
        bbox.visible = true;
        renderer2.render(scene, cam2);
        stats.update();
    })();
});
