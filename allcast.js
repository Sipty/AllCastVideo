

var gl = null;
var g_width = 0;
var g_height = 0;
var g_texture = null;
var g_textureLoc = -1;
var g_programObject = null;
var g_vbo = null;
var g_texCoordOffset=0;
var afVertexData = 0;
var afPictureData = 0;
var afAsmcData = 0;
var afDeltaData = 0;
var g_texture = null;
var strengthVal = 0.5;
var imageNo = 0;
var videoElement;
var c;
var frameWidth = 0;
var frameHeight = 0;

var  playbtn, seekslider, curtimetext, durtimetext, mutebtn, strengthslider, fullscreenbtn;
function intializePlayer(){
	// Set object references
	playbtn = document.getElementById("playpausebtn");
	seekslider = document.getElementById("seekslider");
	curtimetext = document.getElementById("curtimetext");
	durtimetext = document.getElementById("durtimetext");
	mutebtn = document.getElementById("mutebtn");
	strengthslider = document.getElementById("strengthslider");
	fullscreenbtn = document.getElementById("fullscreenbtn");
	// Add event listeners
	playbtn.addEventListener("click",playPause,false);
	seekslider.addEventListener("change",vidSeek,false);
	videoElement.addEventListener("timeupdate",seektimeupdate,false);
	mutebtn.addEventListener("click",vidmute,false);
	strengthslider.addEventListener("change",setStrength,false);
	//fullscreenbtn.addEventListener("click",toggleFullScreen,false);
}

function playPause(){
	if(videoElement.paused){
		videoElement.play();
		intervalID = setInterval(draw, 15);
		playbtn.style.background = "url(pause.png)";
	} else {
		videoElement.pause();
		playbtn.style.background = "url(play.png)";
	}
}

function selectVideo(video)
{
  if (video == 1)
  {
  videoDone();
    video.preload = "auto";
   videoElement.src = "x_man_volbi1_1024x512";
    frameWidth = 1024;//videoElement.videoWidth;
     frameHeight = 512;//videoElement.videoHeight;
  	
  	startVideo();
  }
  else if(video == 2)
  {
  videoDone();
  	video.preload = "auto";
  	videoElement.src = "sky_7_720p_hp.mp4";
  	 frameWidth = 1280;//videoElement.videoWidth;
     frameHeight = 720;//videoElement.videoHeight;
     startVideo();
  }
  else
  {
  videoDone()
  video.preload = "auto";
  // videoElement.src = "x_man_hp_800x480.mp4";
   videoElement.src="youtu.be/MLeIBFYY6UY";
    frameWidth = 1920;//videoElement.videoWidth;
     frameHeight = 1080;//videoElement.videoHeight;
  startVideo();
  }
  
}

function vidSeek(){
	var seekto = videoElement.duration * (seekslider.value / 100);
	videoElement.currentTime = seekto;
}
function seektimeupdate(){
	var nt = videoElement.currentTime * (100 / videoElement.duration);
	seekslider.value = nt;
	var curmins = Math.floor(videoElement.currentTime / 60);
	var cursecs = Math.floor(videoElement.currentTime - curmins * 60);
	var durmins = Math.floor(videoElement.duration / 60);
	var dursecs = Math.floor(videoElement.duration - durmins * 60);
	if(cursecs < 10){ cursecs = "0"+cursecs; }
	if(dursecs < 10){ dursecs = "0"+dursecs; }
	if(curmins < 10){ curmins = "0"+curmins; }
	if(durmins < 10){ durmins = "0"+durmins; }
	curtimetext.innerHTML = curmins+":"+cursecs;
	durtimetext.innerHTML = durmins+":"+dursecs;
}
function vidmute(){
	// if(videoElement.muted){
// 		videoElement.muted = false;
// 		mutebtn.innerHTML = "Iridix OFF";
// 	} else {
// 		videoElement.muted = true;
// 		mutebtn.innerHTML = "Iridix ON";
// 	}
}
// function setvolume(){
// 	videoElement.volume = strengthslider.value / 100;
// }
function toggleFullScreen(){
	// if(videoElement.requestFullScreen){
// 		videoElement.requestFullScreen();
// 	} else if(videoElement.webkitRequestFullScreen){
// 		videoElement.webkitRequestFullScreen();
// 	} else if(videoElement.mozRequestFullScreen){
// 		videoElement.mozRequestFullScreen();
// 	}
}
function main() {
     c = document.getElementById("c");
	videoElement = document.getElementById("video");
	

    //c = WebGLDebugUtils.makeLostContextSimulatingCanvas(c);
    // tell the simulator when to lose context.
    //c.loseContextInNCalls(15);
	intializePlayer();
    c.addEventListener('webglcontextlost', handleContextLost, false);
    c.addEventListener('webglcontextrestored', handleContextRestored, false);
	c.addEventListener("mousedown", doMouseDown, false);
    gl = WebGLUtils.setupWebGL(c);
    if (!gl)
        return;
    g_width = c.width;
    g_height = c.height;
     frameWidth = 800;//videoElement.videoWidth;
     frameHeight = 480;//videoElement.videoHeight;
    //init();
    
    // Start listening for the canplaythrough event, so we don't
    // start playing the video until we can do so without stuttering
    
   // videoElement.addEventListener("canplaythrough", startVideo, true);
    
    // Start listening for the ended event, so we can stop the
    // animation when the video is finished playing.
    
    //videoElement.addEventListener("ended", videoDone, true);

    video.preload = "auto";
   videoElement.src = "x_man_volbi1_1024x512";
    //videoElement.src = "https://dl.dropboxusercontent.com/u/10668480/AllCastVideo/x_man_volbi1_1024x512.ogv";
   // videoElement.src = "x_man_volbi1_1024x512.ogv";
   //videoElement.src = "sky_7_720p_hp.mp4";
   
   startVideo();
}

function doMouseDown(event)
{
 // 	var x = event.pagex;
//  	var y = event.pagey;
//  	imageNo++;
//  	g_texture = loadTexture("https://dl.dropboxusercontent.com/u/10668480/allcast/"+imageNo+".jpg");
//  	
//  	if (imageNo > 2)
//  		imageNo = 0;
}

function log(msg) {
    if (window.console && window.console.log) {
        console.log(msg);
    }
}

function handleContextLost(e) {
    log("handle context lost");
    e.preventDefault();
}

function handleContextRestored() {
    log("handle context restored");
    init();
}

function init() {
    gl.clearColor(0., 0., .7, 1.);
   // g_texture = loadTexture("https://dl.dropboxusercontent.com/u/10668480/allcast/"+imageNo+".jpg");
   	g_texture = gl.createTexture();
    initShaders();
}

function checkGLError() {
    var error = gl.getError();
    if (error != gl.NO_ERROR && error != gl.CONTEXT_LOST_WEBGL) {
        var str = "GL Error: " + error;
       // document.body.appendChild(document.createTextNode(str));
        throw str;
    }
}

//
// updateTexture
//
// Update the texture to contain the latest frame from
// our video.
//
function updateTexture() {
	gl.activeTexture(gl.TEXTURE0);
  gl.bindTexture(gl.TEXTURE_2D, g_texture);
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA,
        gl.UNSIGNED_BYTE, videoElement);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.bindTexture(gl.TEXTURE_2D, null);
}

//
// startVideo
//
// Starts playing the video, so that it will start being used
// as our texture.
//
function startVideo() {
  videoElement.play();
  intervalID = setInterval(draw, 15);
  videoElement.addEventListener( "loadedmetadata", function (e) {
    frameWidth = this.videoWidth,
    frameHeight = this.videoHeight;
      }, false );
      init();
}

//
// videoDone
//
// Called when the video is done playing; this will terminate
// the animation.
//
function videoDone() {
  clearInterval(intervalID);
}



function loadShader(type, shaderSrc) {
    var shader = gl.createShader(type);
    // Load the shader source
    gl.shaderSource(shader, shaderSrc);
    // Compile the shader
    gl.compileShader(shader);
    // Check the compile status
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS) &&
        !gl.isContextLost()) {
        var infoLog = gl.getShaderInfoLog(shader);
        alert("Error compiling shader:\n" + infoLog);
        gl.deleteShader(shader);
        return null;
    }
    return shader;
}

function setStrength()
{
	strengthVal = strengthslider.value;
	//alert("we are in changeStrength: \n "+ strength );
	//draw();
}

function initShaders() {
    var vShaderStr = [
       				"		attribute vec4 myVertex;" ,
					"		attribute vec4 image_spacial;" ,
					"		attribute vec4	asmc_spacial;" ,
					"		attribute vec4 delta_spacial;" ,
					"		varying vec2 image_pos;" ,
					"		varying vec2 asmc_pos;" ,
					"		varying vec2 delta_pos;" ,

					"		void main()" ,
					"		{" ,
					"			gl_Position =  myVertex;" ,
					"			image_pos = (image_spacial).st;" ,
					"		    asmc_pos = (asmc_spacial).st;" ,
					"		    delta_pos = (delta_spacial).st;" ,
					"		}" 
					].join("\n");

    var fShaderStr = [
        		"		precision mediump float;\n" ,
					"		uniform sampler2D image; " ,
					"		uniform float	strength;" ,
					"		uniform float blg;" ,
					"		varying vec2	image_pos;" ,
					"		varying vec2	asmc_pos;" ,
					"		varying vec2	delta_pos;" ,

					"		void main()" ,
					"		{" ,
					"		    vec3 rgb;" ,
					"		    float rAsmc;" ,
					"		    float deltaAc;" ,
					"		    float rAsm;" ,
					"		    float str;" ,
					"		    float a;" ,

					"		    str = strength;" ,
					"		    rgb = texture2D(image, image_pos).rgb;" ,
					"		    rAsmc = texture2D(image, asmc_pos).r;" ,
					"		    deltaAc = texture2D(image, delta_pos).r;" ,
					"		    rAsm = rAsmc + (deltaAc - 0.5)/4.;" ,
					"		    a = str + (1. - str) * rAsm;" ,
					//		"		    a = a * blg;\n" +
					"		    rgb = rgb * a;" ,

					"		gl_FragColor = vec4(rgb, 1.0);" ,

	  				//" 		gl_FragColor = texture2D(image, asmc_pos);\n" +

					"		}"
					].join("\n");

    var vertexShader = loadShader(gl.VERTEX_SHADER, vShaderStr);
    var fragmentShader = loadShader(gl.FRAGMENT_SHADER, fShaderStr);
    // Create the program object
    var programObject = gl.createProgram();
    gl.attachShader(programObject, vertexShader);
    gl.attachShader(programObject, fragmentShader);
    
    // Bind  to attributes
    gl.bindAttribLocation(programObject, 0, "myVertex");
    gl.bindAttribLocation(programObject, 1, "image_spacial");
	gl.bindAttribLocation(programObject, 2, "asmc_spacial");
    gl.bindAttribLocation(programObject, 3, "delta_spacial");
    // Link the program
    gl.linkProgram(programObject);
    // Check the link status
    var linked = gl.getProgramParameter(programObject, gl.LINK_STATUS);
    if (!linked && !gl.isContextLost()) {
        var infoLog = gl.getProgramInfoLog(programObject);
        alert("Error linking program:\n" + infoLog);
        gl.deleteProgram(programObject);
        return;
    }
    g_programObject = programObject;
    g_textureLoc = gl.getUniformLocation(g_programObject, "image");
    
    
    afVertexData = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, afVertexData);
	gl.bufferData(
    gl.ARRAY_BUFFER, 
    new Float32Array([
        	-1.0, -1.0,
        	1.0,  -1.0,
        	-1.0, 1.0,
        	1.0, 1.0]), 
    	gl.STATIC_DRAW);

	afPictureData = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, afPictureData);
	gl.bufferData(
    gl.ARRAY_BUFFER, 
    new Float32Array([
        ((0.2 + 1.0/frameWidth)), 0.0,
        1.0, 0.0,
        ((0.2 + 1.0/frameWidth)), 1.0,
        1.0, 1.0]), 
    	gl.STATIC_DRAW);
        
	afAsmcData = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, afAsmcData);
	gl.bufferData(
    gl.ARRAY_BUFFER, 
    new Float32Array([
        0.0, (0.75+ 1.0/frameHeight),
        0.2, (0.75+ 1.0/frameHeight),
        0.0, 1.0,
        0.2, 1.0]), 
    	gl.STATIC_DRAW);
    
    afDeltaData = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, afDeltaData);
	gl.bufferData(
    gl.ARRAY_BUFFER, 
    new Float32Array([
        0.0, (0.25+ 1.0/frameHeight),
        0.2, (0.25+ 1.0/frameHeight),
        0.0, 0.5,
        0.2, 0.5]), 
    	gl.STATIC_DRAW);
    
    checkGLError();
    //gl.clear(gl.COLOR_BUFFER_BIT);
}

function draw() {

	updateTexture();
    // Note: the viewport is automatically set up to cover the entire Canvas.
    // Clear the color buffer
    

 //  c.width  = window.innerWidth;
//   c.height = window.innerHeight;
  
    checkGLError();
    // Use the program object
    gl.useProgram(g_programObject);
    checkGLError();
    
    // Load the vertex data
    gl.bindBuffer(gl.ARRAY_BUFFER, afVertexData);
    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(0, 2, gl.FLOAT, gl.FALSE, 0, 0);
    
    gl.bindBuffer(gl.ARRAY_BUFFER, afPictureData);
    gl.enableVertexAttribArray(1);
    gl.vertexAttribPointer(1, 2, gl.FLOAT, gl.FALSE, 0, 0);
    
    gl.bindBuffer(gl.ARRAY_BUFFER, afAsmcData);
    gl.enableVertexAttribArray(2);
    gl.vertexAttribPointer(2, 2, gl.FLOAT, gl.FALSE, 0, 0);
    
    gl.bindBuffer(gl.ARRAY_BUFFER, afDeltaData);
    gl.enableVertexAttribArray(3);
    gl.vertexAttribPointer(3, 2, gl.FLOAT, gl.FALSE, 0, 0);
    
    gl.uniform1f(gl.getUniformLocation(g_programObject, "strength"), strengthVal);
    checkGLError();
    // Bind the texture to texture unit 0
    gl.bindTexture(gl.TEXTURE_2D, g_texture);
    checkGLError();
    // Point the uniform sampler to texture unit 0
    gl.uniform1i(g_textureLoc, 0);
    checkGLError();
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    checkGLError();
}
