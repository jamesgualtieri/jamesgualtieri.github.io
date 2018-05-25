var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, 4*window.innerWidth/window.innerHeight, 0.1, 1000 );
var light = new THREE.HemisphereLight( 0xffffbb, 0x080820, 1 );

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, 0.2*window.innerHeight );
document.body.appendChild( renderer.domElement );

var geometry = new THREE.BoxGeometry( 3, 3, 3 );
var material = new THREE.MeshLambertMaterial( );
var cube = new THREE.Mesh( geometry, material );
scene.add(cube);
scene.add(light);

camera.position.z = 5;

var animate = function () {
	requestAnimationFrame( animate );

	cube.rotation.x += 0.01;
	cube.rotation.y += 0.01;

	renderer.render(scene, camera);
};

animate();