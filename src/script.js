import './style.css'
// import * as dat from 'lil-gui'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
// import { sRGBEncoding } from 'three'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
import gsap from 'gsap'
import { RedFormat } from 'three'

console.log(document.styleSheets)

// Clear Scroll Memory
window.history.scrollRestoration = 'manual'

let noClicks = true
let arrayIndex = 0
let isModalOn = false
let prevIndex = 0

// Colors
    // Strip Background, CubeLines

const directionalLightColors = [
    ['0xff0000', '0xffffff', '#ff0000', '#ffffff'],
    ['0xD6ED17', '0x606060', '#D6ED17', '#606060'],
    ['0xff2B33', '0xD05A7F', '#ff2B33', '#D05A7F'],
    ['0x3B64f1', '0xFf6050', '#5B84B1', '#FC766A'],
    ['0xF93822', '0xFDD20E', '#F93822', '#FDD20E'],
    ['0xFCF6F5', '0x2BAE66', '#FCF6F5', '#2BAE66'],
    ['0xc67bc9', '0xb9dafa', '#c67bc9', '#b9dafa'],
    ['0x54afd2', '0xf8d208', '#54afd2', '#f8d208']
]

let currentColor = 0

// Phase of the website
let phase = 0

// h1, h3
const textArray = [
    ['Hello',
    'Get to know me better through this room.',
    "Explore the scene and interact with objects."],
    ['Tech Stack',
    'Coding <t class="mainColor">:</t><br><t class="smallestText">HTML</t> <t class="mainColor smallestText">+</t> <t class="smallestText">CSS</t> <t class="mainColor smallestText">+</t> <t class="smallestText">JavaScript</t> <t class="mainColor smallestText">+</t> <t class="smallestText">WebGL</t> <t class="mainColor smallestText">+</t> <t class="smallestText">Three.js</t> <t class="mainColor smallestText">+</t> <t class="smallestText">GSAP</t><br><br><t class="mainColor smallestText">|</t> <t class="smallestText">Currently unlocking ReactJS, react-three-fiber, PixiJS </t>',
    'Other Tools <t class="mainColor">:</t><br><t class="smallestText">Fusion 360</t> <t class="mainColor smallestText">+</t> <t class="smallestText">Blender</t> <t class="mainColor smallestText">+</t> <t class="smallestText">Inkscape</t>'],
    ['Flag<br>Football',
    "<t class='smallText'>I've always had the knack for sports, but flag football was</t> <b class='smallText mainColor'>the sport.</b>",
    '...'],
    ['Hobbies & Interests<br><t class="subText">Skateboarding</t>',
    '<t class="smallText">Hopped back on after more than 10 years.</t>',
    '<ul>Favorite Skaters <t class="mainColor">:</t><li class="smallestText">Jonny Giger</li><li class="smallestText">P-Rod</li><li class="smallestText">Chris Joslin</li><li class="smallestText">Milton Martinez</li></ul>'],
    ['Education',
    'University of the Philippines - Diliman<br><t class="smallestText mainColor">2021</t><br><t class="smallestText italic">BS Mechanical Engineering</t>',
    'Philippine Science High School - Central Luzon Campus<br><t class="smallestText mainColor">2015</t>'],
    ["What's<br>Playin'",
    '...',
    '...'],
    ['Hobbies & Interests<br><t class="subText">Gaming</t>',
    'Avid gamer interested in Game Development<br><br><t class="mainColor smallestText">|</t> <t class="smallestText">Fiddling with Unreal Engine 5</t>',
    '<ul>Favorite Games <t class="mainColor">:</t><li class="smallestText">Monster Hunter (HH, SnS)</li><li class="smallestText">R6 Siege (Amaru, Kapkan)</li><li class="smallestText">DOTA 2 (Pudge, Rubick)</li></ul>'],
    ["3D<br>Modelling &<br>Printing",
    '...',
    '...']
]


// Inserts Appropriate Topic info
const insertModal = (index) => {
    // console.log('index: ', index)
    const infoModal = document.getElementById('infoModal')
    const contentGrey = document.getElementById('contentGrey')
    const contentRed = document.getElementById('contentRed')
    const stay = document.getElementById('stay')
    const newCanvas = document.getElementById('newCanvas')

    if (isModalOn == false) {
    
        contentGrey.classList.remove('displayGreyx')
        contentRed.classList.remove('displayRedx')
        stay.classList.remove('stayx')
        newCanvas.classList.remove('canvasStayx')
        infoModal.classList.remove('displayx')
    
        const h1Grey = document.getElementById('h1Grey')
        const h1Red = document.getElementById('h1Red')
        const h3Grey = document.getElementById('h3Grey')
        const h3Red = document.getElementById('h3Red')
        const h3Grey2 = document.getElementById('h3Grey2')
        const h3Red2 = document.getElementById('h3Red2')
    
        h1Grey.innerHTML = textArray[index][0]
        h1Red.innerHTML = textArray[index][0]
        h3Grey.innerHTML = textArray[index][1]
        h3Red.innerHTML = textArray[index][1]
        h3Grey2.innerHTML = textArray[index][2]
        h3Red2.innerHTML = textArray[index][2]

    
        infoModal.classList.add('display')
        contentGrey.classList.add('displayGrey')
        contentRed.classList.add('displayRed')
        stay.classList.add('stay')
        newCanvas.classList.add('canvasStay')

        prevIndex = index
        isModalOn = true
    }
    else if (isModalOn == true && index !== prevIndex) {
        // infoModalx.classList.add('displayx')
        contentGrey.classList.add('displayGreyx')
        contentRed.classList.add('displayRedx')
        stay.classList.add('stayx')
        newCanvas.classList.add('canvasStayx')

        isModalOn = false
        setTimeout(function() {
            insertModal(index)
        }, 500)
    }
}

// Closes Info Modal
const closer = document.getElementById('closer')
closer.addEventListener('click', () => {
    // infoModal.classList.remove('display')

    const infoModalx = document.getElementById('infoModal')
    const contentGreyx = document.getElementById('contentGrey')
    const contentRedx = document.getElementById('contentRed')
    const stayx = document.getElementById('stay')
    const newCanvas = document.getElementById('newCanvas')

    // infoModalx.classList.remove('display')
    contentGreyx.classList.remove('displayGrey')
    contentRedx.classList.remove('displayRed')
    stayx.classList.remove('stay')
    newCanvas.classList.remove('canvasStay')


    // infoModalx.classList.add('displayx')
    contentGreyx.classList.add('displayGreyx')
    contentRedx.classList.add('displayRedx')
    stayx.classList.add('stayx')
    newCanvas.classList.add('canvasStayx')


    isModalOn = false

    setTimeout(() => {
        infoModalx.classList.add('displayx')
    }, 500)

})

// -------------------------------------------------------------------------------------------------

const generateNewCanvas = () => {
    let prevCurrentColor = 0

    // Canvas
    const canvas = document.querySelector('canvas.miniWebGL')

    // Scene
    const scene = new THREE.Scene()
    scene.background = new THREE.Color(directionalLightColors[currentColor][2])

    // Resize
    const sizes = {
        width: window.innerWidth*7.5/100*1.25,
        height: window.innerHeight*0.95
    }
    
    window.addEventListener('resize', () =>
    {
        // Update sizes
        sizes.width = window.innerWidth*7.5/100*1.25
        sizes.height = window.innerHeight*0.95
    
        // Update camera
        camera.aspect = window.innerWidth*7.5/100*1.25 / window.innerHeight*0.95
    
        camera.updateProjectionMatrix()
    
        // Update renderer
        renderer.setSize(sizes.width, sizes.height)
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    })

    // Box
    const boxGeometry = new THREE.BoxGeometry( 0.7, 0.7, 0.7 )
    const boxEdges = new THREE.EdgesGeometry( boxGeometry )
    const boxLine = new THREE.LineSegments( boxEdges, new THREE.LineBasicMaterial( {
        color: directionalLightColors[currentColor][3],
        linewidth: 1
    } ) )
    boxLine.position.set(0,0.05,0)
    scene.add( boxLine )

    const coneGeometry = new THREE.BoxGeometry( 0.4, 0.4, 0.4 )
    const coneEdges = new THREE.EdgesGeometry( coneGeometry )
    const coneLine = new THREE.LineSegments( coneEdges, new THREE.LineBasicMaterial( {
        color: directionalLightColors[currentColor][3],
        linewidth: 1
    } ) )
    scene.add( coneLine )
    coneLine.position.set(-0.15, -3.5, -6)

    const box4Geometry = new THREE.BoxGeometry( 0.4, 0.4, 0.4 )
    const box4Edges = new THREE.EdgesGeometry( box4Geometry )
    const box4Line = new THREE.LineSegments( box4Edges, new THREE.LineBasicMaterial( {
        color: directionalLightColors[currentColor][3],
        linewidth: 1
    } ) )
    scene.add( box4Line )
    box4Line.position.set(-0.5, -3.5, -15)

    const sphereGeometry = new THREE.BoxGeometry( 0.7, 0.7, 0.7 )
    const sphereEdges = new THREE.EdgesGeometry( sphereGeometry )
    const sphereLine = new THREE.LineSegments( sphereEdges, new THREE.LineBasicMaterial( {
        color: directionalLightColors[currentColor][3],
        linewidth: 1
    } ) )
    sphereLine.position.set(-0.4,4,-6)
    scene.add( sphereLine )


    // Base camera
    const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 100)
    // camera.rotation.y = Math.PI
    camera.position.set(0,0,5)
  

    // Mouse
    const cursor = {}
    cursor.x = 0
    cursor.y = 0
 

    window.addEventListener('mousemove', (event) =>
    {
        cursor.x = event.clientX / sizes.width - 0.5
        cursor.y = event.clientY / sizes.height - 0.5


    })

    // Parallax Camera Group
    const cameraGroup = new THREE.Group
    cameraGroup.add(camera)
    scene.add(cameraGroup)


    // Axes Helper
    // const axesHelper = new THREE.AxesHelper(10)
    // scene.add(axesHelper)

    /**
     * Renderer
     */
    const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        antialias: true
    })
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    renderer.outputEncoding = THREE.sRGBEncoding
    renderer.toneMapping = THREE.CineonToneMapping

        /**
     * Animate
     */
    let prevTime = 0
    let prevParallaxTime = 0

    const clock = new THREE.Clock()

    const tick = () =>
    {
        const elapsedTime = clock.getElapsedTime()
        let deltaTime = elapsedTime - prevTime
        let parallaxTIme = elapsedTime - prevParallaxTime
        prevParallaxTime = elapsedTime

        // colorChange
        if (currentColor !== prevCurrentColor) {
            scene.background = new THREE.Color(directionalLightColors[currentColor][2])
            boxLine.material.color = new THREE.Color(directionalLightColors[currentColor][3])
            coneLine.material.color = new THREE.Color(directionalLightColors[currentColor][3])
            box4Line.material.color = new THREE.Color(directionalLightColors[currentColor][3])
            sphereLine.material.color = new THREE.Color(directionalLightColors[currentColor][3])
            prevCurrentColor = currentColor
        }

        // Animation
        boxLine.rotation.x += 0.003
        boxLine.rotation.y += 0.002
        boxLine.rotation.z += 0.001
        boxLine.position.y = Math.sin(elapsedTime-2)*0.08

        coneLine.rotation.x += 0.004
        coneLine.rotation.y += 0.001
        coneLine.rotation.z += 0.002
        coneLine.position.y = Math.sin(elapsedTime)*0.03 - 3.5

        box4Line.rotation.x += 0.005
        box4Line.rotation.y += 0.002
        box4Line.rotation.z += 0.003
        box4Line.position.y = Math.sin(elapsedTime)*0.03 - 7.5


        sphereLine.rotation.y += 0.003
        sphereLine.rotation.x += 0.001
        coneLine.rotation.z += 0.003
        sphereLine.position.y = Math.sin(elapsedTime-4)*0.04 + 4

        // Parallax
        const parallaxX = cursor.x * 0.5 * 0.075
        const parallaxY = - cursor.y * 0.5
        cameraGroup.position.x += ( parallaxX - cameraGroup.position.x ) * 2 * parallaxTIme
        cameraGroup.position.y += ( parallaxY - cameraGroup.position.y ) * 2 * parallaxTIme


        // Render
        renderer.render(scene, camera)

        // Call tick again on the next frame
        window.requestAnimationFrame(tick)
    }

    tick()
}

// -----------------------------------------------------------------
/**
 * Base
 */
// Debug
// const gui = new dat.GUI({
//     width: 400
// })
const isNewCanvasOn = document.getElementById('newCanvas')
if (isNewCanvasOn) {
    generateNewCanvas()
}

// Canvas
const canvas = document.querySelector('canvas.webgl')

canvas.addEventListener('mousedown', () => {
    canvas.style.cursor = 'grabbing'
})

canvas.addEventListener('mouseup', () => {
    canvas.style.cursor = 'grab'
})

// Scene
const scene = new THREE.Scene()
scene.background = new THREE.Color(0x000000)


/**
 * Loaders
 */
// Loading Manager
const loadingBar = document.getElementById('loadingBar')
const loadingPage = document.getElementById('loadingPage')

// let goStartSequence = false

const loadingManager = new THREE.LoadingManager(
    // Loaded
    () => {
        gsap.to('#loadingPage' ,{duration: 1, opacity: 0})
        isAnimationPlaying = true
        startSequence()
        setTimeout(() => {
            loadingPage.style.display = 'none'
            // goStartSequence = true
        }, 1000)
        setTimeout(() => {
            spinLeftWall()
        }, 2500)
    },
    // Progress
    (itemUrl, itemsLoaded, itemsTotal) => {
        const progressRatio = itemsLoaded/itemsTotal
        loadingBar.style.transform = 'scaleX(' + progressRatio + ')'
    }
)

// Texture loader
const textureLoader = new THREE.TextureLoader()

// Draco loader
const dracoLoader = new DRACOLoader()
dracoLoader.setDecoderPath('draco/')

// GLTF loader
const gltfLoader = new GLTFLoader(loadingManager)
gltfLoader.setDRACOLoader(dracoLoader)

// Font Loader
const fontLoader = new FontLoader()

// Variables for Phase 0
let P = new THREE.Group
let A = new THREE.Group
let T = new THREE.Group
let R = new THREE.Group
let I = new THREE.Group
let C = new THREE.Group
let K = new THREE.Group
let nameGroup = new THREE.Group
let leftNameWall = new THREE.Group
let leftNameWallPosition = new THREE.Group
let rightNameWall = new THREE.Group
let rightNameWallPosition = new THREE.Group

// Variables for Phase 1
let allObjects = new THREE.Group
let bottomBedframeGroup = new THREE.Group
let topBedframeGroup = new THREE.Group
let topDrawer = new THREE.Group
let midDrawer = new THREE.Group
let botDrawer = new THREE.Group
let staticStairsGroup = new THREE.Group
let wallsandfloor = new THREE.Group
let laptopGroup = new THREE.Group
let screenGroup = new THREE.Group
let mousepad = new THREE.Group
let footballGroup = new THREE.Group
let skateboardGroup = new THREE.Group
let chessboardGroup = new THREE.Group
let hookbase = new THREE.Group
let sablayGroup = new THREE.Group
let switchGroup = new THREE.Group
let joyConGroup = new THREE.Group
let switchDock = new THREE.Group
let switchScreen = new THREE.Group
let headphoneGroup = new THREE.Group
let DBGroup = new THREE.Group
let chair = new THREE.Group
let kunai = new THREE.Group
let spoolGroup = new THREE.Group
let printerStatic = new THREE.Group
let printerPlate = new THREE.Group
let printerTip = new THREE.Group
let staticBook = new THREE.Group
let movingBook = new THREE.Group
let cube = new THREE.Group
let tvBase = new THREE.Group
let tvScreen = new THREE.Group
let curtains = new THREE.Group
let curtainsScale = new THREE.Group
let pokeball = new THREE.Group
let caseGroup = new THREE.Group
let container = new THREE.Group
let cup = new THREE.Group

allObjects.add(bottomBedframeGroup)
allObjects.add(topBedframeGroup)
allObjects.add(topDrawer)
allObjects.add(midDrawer)
allObjects.add(botDrawer)
allObjects.add(staticStairsGroup)
allObjects.add(wallsandfloor)
allObjects.add(laptopGroup)
allObjects.add(screenGroup)
allObjects.add(mousepad)
allObjects.add(footballGroup)
allObjects.add(skateboardGroup)
allObjects.add(chessboardGroup)
allObjects.add(hookbase)
allObjects.add(sablayGroup)
allObjects.add(switchGroup)
allObjects.add(joyConGroup)
allObjects.add(switchDock)
allObjects.add(switchScreen)
allObjects.add(headphoneGroup)
allObjects.add(DBGroup)
allObjects.add(chair)
allObjects.add(kunai)
allObjects.add(spoolGroup)
allObjects.add(printerStatic)
allObjects.add(printerPlate)
allObjects.add(printerTip)
allObjects.add(staticBook)
allObjects.add(movingBook)
allObjects.add(cube)
allObjects.add(tvBase)
allObjects.add(tvScreen)
allObjects.add(curtains)
allObjects.add(curtainsScale)
allObjects.add(pokeball)
allObjects.add(caseGroup)
allObjects.add(container)
allObjects.add(cup)

allObjects.position.set (0,-2,0)
// allObjects.rotation.y = - Math.PI*90/180
// curtainsScale.scale.z = 0.5
// curtainsScale.position.z = -17.5*0.05


// Group Repositions for Phase 1
DBGroup.position.set(-2.25+2.5*0.05,2.65,-1.75)
DBGroup.rotation.y = Math.PI*90/180

chair.position.set(-32.5*0.05, 23*0.05, -20*0.05)
chair.rotation.y = Math.PI*30/180

kunai.position.set(4.5*0.05, -0.25*0.05, 4*0.05)

spoolGroup.position.set(-38*0.05, 14.25*0.05, 49.3*0.05)

cube.position.set(8.5*0.05, 0, 0)

chessboardGroup.position.set(-15*0.05,-28.5*0.05,70*0.05)

switchGroup.position.set(15*0.05, 0, 10*0.05)
switchDock.position.set(15*0.05, 0, 10*0.05)
joyConGroup.position.set(15*0.05, 0, 10*0.05)
switchScreen.position.set(15*0.05, 0, 10*0.05)

tvBase.position.set(0*0.05, 0, 0)
tvScreen.position.set(0*0.05, 0, 0)

bottomBedframeGroup.position.set(2.5*0.05, 0, 0)
topBedframeGroup.position.set(2.5*0.05, 0, 0)

movingBook.position.set(2.5*0.05,0,0)
staticBook.position.set(2.5*0.05,0,0)
headphoneGroup.position.set(2.5*0.05,0,0)
laptopGroup.position.set(2.5*0.05,0,0)
screenGroup.position.set(2.5*0.05,0,0)
mousepad.position.set(2.5*0.05,0,0)
caseGroup.position.set(2.5*0.05,0,0)

sablayGroup.position.set(0,-4*0.025,0)
hookbase.position.set(0,-4*0.025,0)

pokeball.position.set(2.5*0.05,2*0.025,0)

container.position.set(2.5*0.05,0,0)
cup.position.set(2.5*0.05,0,0)

// Phase 0 GLTFLoader

gltfLoader.load(
    'LeftNameWall.glb',
    (obj) => {
       
        scene.add(obj.scene)
        obj.scene.scale.set(0.025,0.025,0.025)

        // console.log(obj)
        leftNameWall.add(obj.scene)
        // obj.scene.castShadow = true
        // obj.scene.children[0].castShadow = true
        obj.scene.children[0].receiveShadow = true
    }
)

gltfLoader.load(
    'RightNameWall.glb',
    (obj) => {
       
        scene.add(obj.scene)
        obj.scene.scale.set(0.025,0.025,0.025)

        // console.log(obj)
        rightNameWall.add(obj.scene)
        // obj.scene.castShadow = true
        // obj.scene.children[0].castShadow = true
        obj.scene.children[0].receiveShadow = true
    }
)

gltfLoader.load(
    'P.glb',
    (obj) => {
       
        scene.add(obj.scene)
        obj.scene.scale.set(0.025,0.025,0.025)

        // console.log(obj)
        P.add(obj.scene)
        // obj.scene.castShadow = true
        obj.scene.children[0].castShadow = true
        // obj.scene.children[0].receiveShadow = true
    }
)

gltfLoader.load(
    'A.glb',
    (obj) => {
       
        scene.add(obj.scene)
        obj.scene.scale.set(0.025,0.025,0.025)


        // console.log(obj)
        A.add(obj.scene)
        // obj.scene.castShadow = true
        obj.scene.children[0].castShadow = true
        // obj.scene.children[0].receiveShadow = true
    }
)

gltfLoader.load(
    'T.glb',
    (obj) => {
       
        scene.add(obj.scene)
        obj.scene.scale.set(0.025,0.025,0.025)


        // console.log(obj)
        T.add(obj.scene)
        // obj.scene.castShadow = true
        obj.scene.children[0].castShadow = true
        // obj.scene.children[0].receiveShadow = true
    }
)

gltfLoader.load(
    'R.glb',
    (obj) => {
       
        scene.add(obj.scene)
        obj.scene.scale.set(0.025,0.025,0.025)


        // console.log(obj)
        R.add(obj.scene)
        // obj.scene.castShadow = true
        obj.scene.children[0].castShadow = true
        // obj.scene.children[0].receiveShadow = true
    }
)

gltfLoader.load(
    'I.glb',
    (obj) => {
       
        scene.add(obj.scene)
        obj.scene.scale.set(0.025,0.025,0.025)


        // console.log(obj)
        I.add(obj.scene)
        // obj.scene.castShadow = true
        obj.scene.children[0].castShadow = true
        // obj.scene.children[0].receiveShadow = true
    }
)

gltfLoader.load(
    'C.glb',
    (obj) => {
       
        scene.add(obj.scene)
        obj.scene.scale.set(0.025,0.025,0.025)


        // console.log(obj)
        C.add(obj.scene)
        // obj.scene.castShadow = true
        obj.scene.children[0].castShadow = true
        // obj.scene.children[0].receiveShadow = true
    }
)

gltfLoader.load(
    'K.glb',
    (obj) => {
       
        scene.add(obj.scene)
        obj.scene.scale.set(0.025,0.025,0.025)


        // console.log(obj)
        K.add(obj.scene)
        // obj.scene.castShadow = true
        obj.scene.children[0].castShadow = true
        // obj.scene.children[0].receiveShadow = true
    }
)




// GLTF Loader for Phase 1
gltfLoader.load(
    'Cup.glb',
    (obj) => {
       
        scene.add(obj.scene)
        obj.scene.scale.set(0.05,0.05,0.05)

        // console.log(obj)
        cup.add(obj.scene)
        // obj.scene.castShadow = true
        obj.scene.children[0].castShadow = true
        obj.scene.children[0].receiveShadow = true
    }
)

gltfLoader.load(
    'Container.glb',
    (obj) => {
       
        scene.add(obj.scene)
        obj.scene.scale.set(0.05,0.05,0.05)

        // console.log(obj)
        container.add(obj.scene)
        // obj.scene.castShadow = true
        obj.scene.children[0].castShadow = true
        obj.scene.children[0].receiveShadow = true
    }
)

gltfLoader.load(
    'Case.glb',
    (obj) => {
       
        scene.add(obj.scene)
        obj.scene.scale.set(0.05,0.05,0.05)

        // console.log(obj)
        caseGroup.add(obj.scene)
        // obj.scene.castShadow = true
        obj.scene.children[0].castShadow = true
        obj.scene.children[0].receiveShadow = true
        obj.scene.children[1].castShadow = true
        obj.scene.children[1].receiveShadow = true
    }
)

gltfLoader.load(
    'PokeBall.glb',
    (obj) => {
       
        scene.add(obj.scene)
        obj.scene.scale.set(0.05,0.05,0.05)

        // console.log(obj)
        pokeball.add(obj.scene)
        // obj.scene.castShadow = true
        obj.scene.children[0].castShadow = true
        obj.scene.children[0].receiveShadow = true
        obj.scene.children[1].castShadow = true
        obj.scene.children[1].receiveShadow = true
        obj.scene.children[2].castShadow = true
        obj.scene.children[2].receiveShadow = true
    }
)

gltfLoader.load(
    'CurtainsScale.glb',
    (obj) => {
       
        scene.add(obj.scene)
        obj.scene.scale.set(0.05,0.05,0.05)

        // console.log(obj)
        curtainsScale.add(obj.scene)
        // obj.scene.castShadow = true
        obj.scene.children[0].castShadow = true
        obj.scene.children[0].receiveShadow = true
    }
)

gltfLoader.load(
    'CurtainsLeft.glb',
    (obj) => {
       
        scene.add(obj.scene)
        obj.scene.scale.set(0.05,0.05,0.05)

        // console.log(obj)
        curtains.add(obj.scene)
        // obj.scene.castShadow = true
        obj.scene.children[0].castShadow = true
        obj.scene.children[0].receiveShadow = true
    }
)

gltfLoader.load(
    'Curtains.glb',
    (obj) => {
       
        scene.add(obj.scene)
        obj.scene.scale.set(0.05,0.05,0.05)

        // console.log(obj)
        curtains.add(obj.scene)
        // obj.scene.castShadow = true
        obj.scene.children[0].castShadow = true
        obj.scene.children[0].receiveShadow = true
    }
)

gltfLoader.load(
    'TVScreen.glb',
    (obj) => {
       
        scene.add(obj.scene)
        obj.scene.scale.set(0.05,0.05,0.05)

        // console.log(obj)
        tvScreen.add(obj.scene)
        // obj.scene.castShadow = true
        obj.scene.children[0].castShadow = true
        obj.scene.children[0].receiveShadow = true
    }
)

gltfLoader.load(
    'TVBase.glb',
    (obj) => {
       
        scene.add(obj.scene)
        obj.scene.scale.set(0.05,0.05,0.05)

        // console.log(obj)
        tvBase.add(obj.scene)
        // obj.scene.castShadow = true
        obj.scene.children[0].castShadow = true
        obj.scene.children[0].receiveShadow = true
        obj.scene.children[1].castShadow = true
        obj.scene.children[1].receiveShadow = true
    }
)

gltfLoader.load(
    'CubeBlack.glb',
    (obj) => {
       
        scene.add(obj.scene)
        obj.scene.scale.set(0.05,0.05,0.05)

        // console.log(obj)
        cube.add(obj.scene)
        // obj.scene.castShadow = true
        obj.scene.children[0].castShadow = true
        obj.scene.children[0].receiveShadow = true
        obj.scene.children[1].castShadow = true
        obj.scene.children[1].receiveShadow = true
        obj.scene.children[2].castShadow = true
        obj.scene.children[2].receiveShadow = true
        obj.scene.children[3].castShadow = true
        obj.scene.children[3].receiveShadow = true
        obj.scene.children[4].castShadow = true
        obj.scene.children[4].receiveShadow = true
        obj.scene.children[5].castShadow = true
        obj.scene.children[5].receiveShadow = true
        obj.scene.children[6].castShadow = true
        obj.scene.children[6].receiveShadow = true
    }
)

gltfLoader.load(
    'MovingBook.glb',
    (obj) => {
       
        scene.add(obj.scene)
        obj.scene.scale.set(0.05,0.05,0.05)

        // console.log(obj)
        movingBook.add(obj.scene)
        // obj.scene.castShadow = true
        obj.scene.children[0].castShadow = true
        obj.scene.children[0].receiveShadow = true
        obj.scene.children[1].castShadow = true
        obj.scene.children[1].receiveShadow = true
    }
)

gltfLoader.load(
    'StaticBook.glb',
    (obj) => {
       
        scene.add(obj.scene)
        obj.scene.scale.set(0.05,0.05,0.05)

        // console.log(obj)
        staticBook.add(obj.scene)
        // obj.scene.castShadow = true
        obj.scene.children[0].castShadow = true
        obj.scene.children[0].receiveShadow = true
        obj.scene.children[1].castShadow = true
        obj.scene.children[1].receiveShadow = true
        obj.scene.children[2].castShadow = true
        obj.scene.children[2].receiveShadow = true
        obj.scene.children[3].castShadow = true
        obj.scene.children[3].receiveShadow = true
        obj.scene.children[4].castShadow = true
        obj.scene.children[4].receiveShadow = true
        obj.scene.children[5].castShadow = true
        obj.scene.children[5].receiveShadow = true
        obj.scene.children[6].castShadow = true
        obj.scene.children[6].receiveShadow = true
    }
)

gltfLoader.load(
    'PrinterTip.glb',
    (obj) => {
       
        scene.add(obj.scene)
        obj.scene.scale.set(0.05,0.05,0.05)

        // console.log(obj)
        printerTip.add(obj.scene)
        // obj.scene.castShadow = true
        obj.scene.children[0].castShadow = true
        obj.scene.children[0].receiveShadow = true
    }
)

gltfLoader.load(
    'PrinterPlate.glb',
    (obj) => {
       
        scene.add(obj.scene)
        obj.scene.scale.set(0.05,0.05,0.05)

        // console.log(obj)
        printerPlate.add(obj.scene)
        // obj.scene.castShadow = true
        obj.scene.children[0].castShadow = true
        obj.scene.children[0].receiveShadow = true
    }
)

gltfLoader.load(
    'PrinterStatic.glb',
    (obj) => {
        
        scene.add(obj.scene)
        obj.scene.scale.set(0.05,0.05,0.05)

        // console.log(obj)
        printerStatic.add(obj.scene)
        // obj.scene.castShadow = true
        obj.scene.children[0].castShadow = true
        obj.scene.children[0].receiveShadow = true
        obj.scene.children[1].castShadow = true
        obj.scene.children[1].receiveShadow = true
    }
)

gltfLoader.load(
    'Fillament.glb',
    (obj) => {
       
        scene.add(obj.scene)
        obj.scene.scale.set(0.05,0.05,0.05)

        // console.log(obj)
        spoolGroup.add(obj.scene)
        // obj.scene.castShadow = true
        obj.scene.children[0].castShadow = true
        obj.scene.children[0].receiveShadow = true
    }
)

gltfLoader.load(
    'PLASpool.glb',
    (obj) => {
       
        scene.add(obj.scene)
        obj.scene.scale.set(0.05,0.05,0.05)

        // console.log(obj)
        spoolGroup.add(obj.scene)
        // obj.scene.castShadow = true
        obj.scene.children[0].castShadow = true
        obj.scene.children[0].receiveShadow = true
    }
)

gltfLoader.load(
    'KunaiBase.glb',
    (obj) => {
       
        scene.add(obj.scene)
        obj.scene.scale.set(0.05,0.05,0.05)

        // console.log(obj)
        kunai.add(obj.scene)
        // obj.scene.castShadow = true
        obj.scene.children[0].castShadow = true
        obj.scene.children[0].receiveShadow = true
    }
)

gltfLoader.load(
    'KunaiHandle.glb',
    (obj) => {
       
        scene.add(obj.scene)
        obj.scene.scale.set(0.05,0.05,0.05)

        // console.log(obj)
        kunai.add(obj.scene)
        // obj.scene.castShadow = true
        obj.scene.children[0].castShadow = true
        obj.scene.children[0].receiveShadow = true
    }
)

gltfLoader.load(
    'Chair.glb',
    (obj) => {
       
        scene.add(obj.scene)
        obj.scene.scale.set(0.05,0.05,0.05)

        // console.log(obj)
        chair.add(obj.scene)
        // obj.scene.castShadow = true
        obj.scene.children[0].castShadow = true
        obj.scene.children[0].receiveShadow = true
    }
)

gltfLoader.load(
    'DBSphere.glb',
    (obj) => {
       
        scene.add(obj.scene)
        obj.scene.scale.set(0.05,0.05,0.05)

        // console.log(obj)
        DBGroup.add(obj.scene)
        // obj.scene.castShadow = true
        obj.scene.children[0].castShadow = true
        obj.scene.children[0].receiveShadow = true
    }
)

gltfLoader.load(
    'DBStar.glb',
    (obj) => {
       
        scene.add(obj.scene)
        obj.scene.scale.set(0.05,0.05,0.05)

        // console.log(obj)
        DBGroup.add(obj.scene)
        // obj.scene.castShadow = true
        obj.scene.children[0].castShadow = true
        obj.scene.children[0].receiveShadow = true
    }
)

gltfLoader.load(
    'HeadphoneFoam.glb',
    (obj) => {
       
        scene.add(obj.scene)
        obj.scene.scale.set(0.05,0.05,0.05)

        // console.log(obj)
        headphoneGroup.add(obj.scene)
        // obj.scene.castShadow = true
        obj.scene.children[0].castShadow = true
        obj.scene.children[0].receiveShadow = true
    }
)

gltfLoader.load(
    'HeadphoneBase.glb',
    (obj) => {
       
        scene.add(obj.scene)
        obj.scene.scale.set(0.05,0.05,0.05)

        // console.log(obj)
        headphoneGroup.add(obj.scene)
        // obj.scene.castShadow = true
        obj.scene.children[0].castShadow = true
        obj.scene.children[0].receiveShadow = true
    }
)

gltfLoader.load(
    'SwitchDock.glb',
    (obj) => {
       
        scene.add(obj.scene)
        obj.scene.scale.set(0.05,0.05,0.05)

        // console.log(obj)
        switchDock.add(obj.scene)
        // obj.scene.castShadow = true
        obj.scene.children[0].castShadow = true
        obj.scene.children[0].receiveShadow = true
    }
)

gltfLoader.load(
    'BlackSwitchButtons.glb',
    (obj) => {
       
        scene.add(obj.scene)
        obj.scene.scale.set(0.05,0.05,0.05)

        // console.log(obj)
        joyConGroup.add(obj.scene)
        // obj.scene.castShadow = true
        obj.scene.children[0].castShadow = true
        obj.scene.children[0].receiveShadow = true
    }
)

gltfLoader.load(
    'BlueJoyCon.glb',
    (obj) => {
       
        scene.add(obj.scene)
        obj.scene.scale.set(0.05,0.05,0.05)

        // console.log(obj)
        joyConGroup.add(obj.scene)
        // obj.scene.castShadow = true
        obj.scene.children[0].castShadow = true
        obj.scene.children[0].receiveShadow = true
    }
)

gltfLoader.load(
    'RedJoyCon.glb',
    (obj) => {
       
        scene.add(obj.scene)
        obj.scene.scale.set(0.05,0.05,0.05)

        // console.log(obj)
        joyConGroup.add(obj.scene)
        // obj.scene.castShadow = true
        obj.scene.children[0].castShadow = true
        obj.scene.children[0].receiveShadow = true
    }
)


gltfLoader.load(
    'SwitchScreen.glb',
    (obj) => {
       
        scene.add(obj.scene)
        obj.scene.scale.set(0.05,0.05,0.05)

        // console.log(obj)
        switchScreen.add(obj.scene)
        // obj.scene.castShadow = true
        obj.scene.children[0].castShadow = true
        obj.scene.children[0].receiveShadow = true
    }
)


gltfLoader.load(
    'SwitchBlack.glb',
    (obj) => {
       
        scene.add(obj.scene)
        obj.scene.scale.set(0.05,0.05,0.05)

        // console.log(obj)
        switchGroup.add(obj.scene)
        // obj.scene.castShadow = true
        obj.scene.children[0].castShadow = true
        obj.scene.children[0].receiveShadow = true
    }
)

gltfLoader.load(
    'Sablay.glb',
    (obj) => {
       
        scene.add(obj.scene)
        obj.scene.scale.set(0.05,0.05,0.05)

        // console.log(obj)
        sablayGroup.add(obj.scene)
        // obj.scene.castShadow = true
        obj.scene.children[0].castShadow = true
        obj.scene.children[0].receiveShadow = true
    }
)

gltfLoader.load(
    'HookBase.glb',
    (obj) => {
       
        scene.add(obj.scene)
        obj.scene.scale.set(0.05,0.05,0.05)

        // console.log(obj)
        hookbase.add(obj.scene)
        // obj.scene.castShadow = true
        obj.scene.children[0].castShadow = true
        obj.scene.children[0].receiveShadow = true
    }
)

gltfLoader.load(
    'ChessBoard.glb',
    (obj) => {
       
        scene.add(obj.scene)
        obj.scene.scale.set(0.05,0.05,0.05)

        // console.log(obj)
        chessboardGroup.add(obj.scene)
        // obj.scene.castShadow = true
        obj.scene.children[0].castShadow = true
        obj.scene.children[0].receiveShadow = true
    }
)

gltfLoader.load(
    'ChessBoardLight.glb',
    (obj) => {
       
        scene.add(obj.scene)
        obj.scene.scale.set(0.05,0.05,0.05)

        // console.log(obj)
        chessboardGroup.add(obj.scene)
        // obj.scene.castShadow = true
        obj.scene.children[0].castShadow = true
        obj.scene.children[0].receiveShadow = true
    }
)

gltfLoader.load(
    'DarkTiles.glb',
    (obj) => {
       
        scene.add(obj.scene)
        obj.scene.scale.set(0.05,0.05,0.05)

        // console.log(obj)
        chessboardGroup.add(obj.scene)
        // obj.scene.castShadow = true
        obj.scene.children[0].castShadow = true
        obj.scene.children[0].receiveShadow = true
    }
)

gltfLoader.load(
    'LightTIles.glb',
    (obj) => {
       
        scene.add(obj.scene)
        obj.scene.scale.set(0.05,0.05,0.05)

        // console.log(obj)
        chessboardGroup.add(obj.scene)
        // obj.scene.castShadow = true
        obj.scene.children[0].castShadow = true
        obj.scene.children[0].receiveShadow = true
    }
)

gltfLoader.load(
    'Board.glb',
    (obj) => {
       
        scene.add(obj.scene)
        obj.scene.scale.set(0.05,0.05,0.05)

        // console.log(obj)
        skateboardGroup.add(obj.scene)
        // obj.scene.castShadow = true
        obj.scene.children[0].castShadow = true
        obj.scene.children[0].receiveShadow = true
    }
)

gltfLoader.load(
    'Trucks.glb',
    (obj) => {
       
        scene.add(obj.scene)
        obj.scene.scale.set(0.05,0.05,0.05)

        // console.log(obj)
        skateboardGroup.add(obj.scene)
        // obj.scene.castShadow = true
        obj.scene.children[0].castShadow = true
        // obj.scene.children[0].receiveShadow = true
    }
)

gltfLoader.load(
    'Wheels.glb',
    (obj) => {
       
        scene.add(obj.scene)
        obj.scene.scale.set(0.05,0.05,0.05)

        // console.log(obj)
        skateboardGroup.add(obj.scene)
        // obj.scene.castShadow = true
        obj.scene.children[0].castShadow = true
        obj.scene.children[0].receiveShadow = true
    }
)

gltfLoader.load(
    'Griptape.glb',
    (obj) => {
       
        scene.add(obj.scene)
        obj.scene.scale.set(0.05,0.05,0.05)

        // console.log(obj)
        skateboardGroup.add(obj.scene)
        // obj.scene.castShadow = true
        obj.scene.children[0].castShadow = true
        obj.scene.children[0].receiveShadow = true
    }
)

gltfLoader.load(
    'Laces.glb',
    (obj) => {
       
        scene.add(obj.scene)
        obj.scene.scale.set(0.05,0.05,0.05)

        // console.log(obj)
        footballGroup.add(obj.scene)
        // obj.scene.castShadow = true
        obj.scene.children[0].castShadow = true
        obj.scene.children[0].receiveShadow = true
    }
)

gltfLoader.load(
    'Football.glb',
    (obj) => {
       
        scene.add(obj.scene)
        obj.scene.scale.set(0.05,0.05,0.05)

        // console.log(obj)
        footballGroup.add(obj.scene)
        // obj.scene.castShadow = true
        obj.scene.children[0].castShadow = true
        obj.scene.children[0].receiveShadow = true
    }
)

gltfLoader.load(
    'MousePad.glb',
    (obj) => {
       
        scene.add(obj.scene)
        obj.scene.scale.set(0.05,0.05,0.05)

        // console.log(obj)
        mousepad.add(obj.scene)
        // obj.scene.castShadow = true
        obj.scene.children[0].castShadow = true
        obj.scene.children[0].receiveShadow = true
    }
)

gltfLoader.load(
    'TopLaptop.glb',
    (obj) => {
       
        scene.add(obj.scene)
        obj.scene.scale.set(0.05,0.05,0.05)

        // console.log(obj)
        // obj.scene.castShadow = true
        obj.scene.children[0].castShadow = true
        obj.scene.children[0].receiveShadow = true
        laptopGroup.add(obj.scene)
    }
)

gltfLoader.load(
    'BottomLaptop.glb',
    (obj) => {
       
        scene.add(obj.scene)
        obj.scene.scale.set(0.05,0.05,0.05)

        // console.log(obj)
        laptopGroup.add(obj.scene)
        // obj.scene.castShadow = true
        obj.scene.children[0].castShadow = true
        obj.scene.children[0].receiveShadow = true
    }
)

gltfLoader.load(
    'Screen.glb',
    (obj) => {
       
        // obj.scene.traverse((child) => {
        //     child.material = offLaptopMaterial
        // })

        scene.add(obj.scene)
        obj.scene.scale.set(0.05,0.05,0.05)
        

        // console.log(obj)
        // obj.scene.castShadow = true
        obj.scene.children[0].castShadow = true
        obj.scene.children[0].receiveShadow = true
        screenGroup.add(obj.scene)

    }
)

gltfLoader.load(
    'WoodFloor.glb',
    (obj) => {
       
        scene.add(obj.scene)
        obj.scene.scale.set(0.05,0.05,0.05)

        // console.log(obj)
        wallsandfloor.add(obj.scene)
        // obj.scene.castShadow = true
        obj.scene.children[0].receiveShadow = true
    }
)


gltfLoader.load(
    'WhiteMats.glb',
    (obj) => {
       
        scene.add(obj.scene)
        obj.scene.scale.set(0.05,0.05,0.05)

        // console.log(obj)
        staticStairsGroup.add(obj.scene)
        obj.scene.children[0].castShadow = true
        obj.scene.children[0].receiveShadow = true
    }
)

gltfLoader.load(
    'WhiteDrawerTop.glb',
    (obj) => {
       
        scene.add(obj.scene)
        obj.scene.scale.set(0.05,0.05,0.05)

        // console.log(obj)
        topDrawer.add(obj.scene)
        obj.scene.children[0].castShadow = true
        obj.scene.children[0].receiveShadow = true
    }
)

gltfLoader.load(
    'WhiteDrawerMiddle.glb',
    (obj) => {
       
        scene.add(obj.scene)
        obj.scene.scale.set(0.05,0.05,0.05)

        // console.log(obj)
        midDrawer.add(obj.scene)
        obj.scene.children[0].castShadow = true
        obj.scene.children[0].receiveShadow = true
    }
)

gltfLoader.load(
    'WhiteDrawerBottom.glb',
    (obj) => {
       
        scene.add(obj.scene)
        obj.scene.scale.set(0.05,0.05,0.05)

        // console.log(obj)
        botDrawer.add(obj.scene)
        obj.scene.children[0].castShadow = true
        obj.scene.children[0].receiveShadow = true
    }
)

gltfLoader.load(
    'TopWhiteBedframe.glb',
    (obj) => {
       
        scene.add(obj.scene)
        obj.scene.scale.set(0.05,0.05,0.05)

        // console.log(obj)
        topBedframeGroup.add(obj.scene)
        obj.scene.children[0].castShadow = true
        obj.scene.children[0].receiveShadow = true

    }
)

gltfLoader.load(
    'TopBlackBedframe.glb',
    (obj) => {
       
        scene.add(obj.scene)
        obj.scene.scale.set(0.05,0.05,0.05)

        // console.log(obj)
        topBedframeGroup.add(obj.scene)
        obj.scene.children[0].castShadow = true
        obj.scene.children[0].receiveShadow = true

    }
)

gltfLoader.load(
    'RedWalls.glb',
    (obj) => {
       
        scene.add(obj.scene)
        obj.scene.scale.set(0.05,0.05,0.05)

        // console.log(obj)
        wallsandfloor.add(obj.scene)
        obj.scene.castShadow = true
        obj.scene.children[0].receiveShadow = true
    }
)

gltfLoader.load(
    'Pillow.glb',
    (obj) => {
       
        scene.add(obj.scene)
        obj.scene.scale.set(0.05,0.05,0.05)

        // console.log(obj)
        topBedframeGroup.add(obj.scene)
        obj.scene.children[0].castShadow = true
        obj.scene.children[0].receiveShadow = true
    }
)

gltfLoader.load(
    'BottomWhiteBedframe.glb',
    (obj) => {
       
        scene.add(obj.scene)
        obj.scene.scale.set(0.05,0.05,0.05)

        // console.log(obj)
        bottomBedframeGroup.add(obj.scene)
        obj.scene.children[0].castShadow = true
        obj.scene.children[0].receiveShadow = true
    }
)

gltfLoader.load(
    'BottomBlackBedframe.glb',
    (obj) => {
       
        scene.add(obj.scene)
        obj.scene.scale.set(0.05,0.05,0.05)

        // console.log(obj)
        bottomBedframeGroup.add(obj.scene)
        obj.scene.children[0].castShadow = true
        obj.scene.children[0].receiveShadow = true

    }
)

gltfLoader.load(
    'BlackStairs.glb',
    (obj) => {
       
        scene.add(obj.scene)
        obj.scene.scale.set(0.05,0.05,0.05)

        // console.log(obj)
        staticStairsGroup.add(obj.scene)
        obj.scene.children[0].castShadow = true
        obj.scene.children[0].receiveShadow = true
    }
)


gltfLoader.load(
    'Bed.glb',
    (obj) => {
       
        scene.add(obj.scene)
        obj.scene.scale.set(0.05,0.05,0.05)

        // console.log(obj)
        topBedframeGroup.add(obj.scene)
        obj.scene.children[0].castShadow = true
        obj.scene.children[0].receiveShadow = true


    }
)

// Lighting

const ambientLight = new THREE.AmbientLight(0xaa00ff, 0.1)

const offAmbientLight = new THREE.AmbientLight(0xaaaaff, 0.3)
// scene.add(ambientLight)


const pointLight = new THREE.PointLight(0x1100ff, 1)
const offPointLight = new THREE.PointLight(0xaaaaff, 0.4)


pointLight.position.set(0,12,12)
pointLight.castShadow = true
pointLight.shadow.mapSize.x = 1024*4
pointLight.shadow.mapSize.y = 1024*4
pointLight.shadow.camera.near = 5
pointLight.shadow.camera.far = 30
pointLight.shadow.normalBias = 0.05

offPointLight.position.set(0,12,12)
offPointLight.castShadow = true
offPointLight.shadow.mapSize.x = 1024*4
offPointLight.shadow.mapSize.y = 1024*4
offPointLight.shadow.camera.near = 5
offPointLight.shadow.camera.far = 30
offPointLight.shadow.normalBias = 0.05

// scene.add(pointLight)

const rectAreaLight = new THREE.RectAreaLight(0x2222ff, 2000, 0.15, 0.1)
rectAreaLight.position.set(-1.25+2.5*0.05,0,-1.75)
rectAreaLight.lookAt(new THREE.Vector3(0,0,100))

// Position Checker
// const box = new THREE.Mesh(new THREE.BoxGeometry(0.3,0.3,0.3), new THREE.MeshNormalMaterial)
// box.position.set(-1.25,0,-1.75)
// scene.add(box)

/**
 * Sizes
 */
let zoomFactor = 1

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

let isPortrait = false
let isPhaseChanging = false

let scrollMainTextSize = document.styleSheets[5].cssRules[69]
let scrollTopSize = document.styleSheets[5].cssRules[71]
let scrollBottomSize = document.styleSheets[5].cssRules[72]
let fromTheLeftSize = document.styleSheets[5].cssRules[78]
let fromTheRightSize = document.styleSheets[5].cssRules[79]
let pressStartSize = document.styleSheets[5].cssRules[88]

const projectsContentResize = document.styleSheets[5].cssRules[95]
const projectsDivResize = document.styleSheets[5].cssRules[91]
const projectsTextDivResize = document.styleSheets[5].cssRules[92]
const projectsContentDivSubsResize = document.styleSheets[5].cssRules[96]
const stackTextResize = document.styleSheets[5].cssRules[109]
const PressStartSmallerResize = document.styleSheets[5].cssRules[111]
const doubleUpResize = document.styleSheets[5].cssRules[94]
const emailTextResize = document.styleSheets[5].cssRules[116]


if(window.innerHeight > window.innerWidth) {
    if (window.innerWidth <= 320) {
        zoomFactor = 5
        scrollMainTextSize.style.fontSize = '10rem'
        scrollTopSize.style.fontSize = '10rem'
        scrollBottomSize.style.fontSize = '10rem'
        fromTheLeftSize.style.fontSize = '6rem'
        fromTheRightSize.style.fontSize = '6rem'
        pressStartSize.style.fontSize = '4rem'
        projectsContentResize.style.fontSize = '4rem'
        projectsDivResize.style.fontSize = '4rem'
        projectsDivResize.style.width = '10vh'
        projectsTextDivResize.style.height = '10vh'
        projectsTextDivResize.style.transform = 'rotate(90deg) translateY(-10vh) translateX(-300vh)'
        projectsContentDivSubsResize.style.width = 'calc(100vw - 10vh)'
        projectsContentDivSubsResize.style.marginLeft = '10vh'
        stackTextResize.style.fontSize = '2rem'
        PressStartSmallerResize.style.fontSize = '1.5rem'
        doubleUpResize.style.transform = 'scale(1.5)'
        emailTextResize.style.fontSize = '3rem'
    }
    else if (window.innerWidth > 320 && window.innerWidth <= 375) {
        zoomFactor = 4.5
        scrollMainTextSize.style.fontSize = '10rem'
        scrollTopSize.style.fontSize = '10rem'
        scrollBottomSize.style.fontSize = '10rem'
        fromTheLeftSize.style.fontSize = '6rem'
        fromTheRightSize.style.fontSize = '6rem'
        pressStartSize.style.fontSize = '4rem'
        projectsContentResize.style.fontSize = '4rem'
        projectsDivResize.style.fontSize = '4rem'
        projectsDivResize.style.width = '10vh'
        projectsTextDivResize.style.height = '10vh'
        projectsTextDivResize.style.transform = 'rotate(90deg) translateY(-10vh) translateX(-300vh)'
        projectsContentDivSubsResize.style.width = 'calc(100vw - 10vh)'
        projectsContentDivSubsResize.style.marginLeft = '10vh'
        stackTextResize.style.fontSize = '2rem'
        PressStartSmallerResize.style.fontSize = '1.5rem'
        doubleUpResize.style.transform = 'scale(1.5)'
        emailTextResize.style.fontSize = '3rem'
        

    }
    else if (window.innerWidth > 375 && window.innerWidth <= 425) {
        zoomFactor = 4
        scrollMainTextSize.style.fontSize = '10rem'
        scrollTopSize.style.fontSize = '10rem'
        scrollBottomSize.style.fontSize = '10rem'
        fromTheLeftSize.style.fontSize = '6rem'
        fromTheRightSize.style.fontSize = '6rem'
        pressStartSize.style.fontSize = '4rem'
        projectsContentResize.style.fontSize = '4rem'
        projectsDivResize.style.fontSize = '4rem'
        projectsDivResize.style.width = '10vh'
        projectsTextDivResize.style.height = '10vh'
        projectsTextDivResize.style.transform = 'rotate(90deg) translateY(-10vh) translateX(-300vh)'
        projectsContentDivSubsResize.style.width = 'calc(100vw - 10vh)'
        projectsContentDivSubsResize.style.marginLeft = '10vh'
        stackTextResize.style.fontSize = '2rem'
        PressStartSmallerResize.style.fontSize = '1.5rem'
        doubleUpResize.style.transform = 'scale(1.5)'
        emailTextResize.style.fontSize = '3rem'
        

    }
    else if (window.innerWidth > 425 && window.innerWidth <= 750) {
        zoomFactor = 3
        scrollMainTextSize.style.fontSize = '10rem'
        scrollTopSize.style.fontSize = '10rem'
        scrollBottomSize.style.fontSize = '10rem'
        fromTheLeftSize.style.fontSize = '6rem'
        fromTheRightSize.style.fontSize = '6rem'
        pressStartSize.style.fontSize = '4rem'
        projectsContentResize.style.fontSize = '4rem'
        projectsDivResize.style.fontSize = '4rem'
        projectsDivResize.style.width = '10vh'
        projectsTextDivResize.style.height = '10vh'
        projectsTextDivResize.style.transform = 'rotate(90deg) translateY(-10vh) translateX(-300vh)'
        projectsContentDivSubsResize.style.width = 'calc(100vw - 10vh)'
        projectsContentDivSubsResize.style.marginLeft = '10vh'
        stackTextResize.style.fontSize = '2rem'
        PressStartSmallerResize.style.fontSize = '1.5rem'
        doubleUpResize.style.transform = 'scale(1.5)'
        emailTextResize.style.fontSize = '3rem'

    }
    else if (window.innerWidth > 750 && window.innerWidth <= 950) {
        zoomFactor = 2.5
        scrollMainTextSize.style.fontSize = '10rem'
        scrollTopSize.style.fontSize = '10rem'
        scrollBottomSize.style.fontSize = '10rem'
        fromTheLeftSize.style.fontSize = '6rem'
        fromTheRightSize.style.fontSize = '6rem'
        pressStartSize.style.fontSize = '4rem'
        projectsDivResize.style.fontSize = '4rem'
        projectsContentResize.style.fontSize = '4rem'
        projectsDivResize.style.width = '10vh'
        projectsTextDivResize.style.height = '10vh'
        projectsTextDivResize.style.transform = 'rotate(90deg) translateY(-10vh) translateX(-300vh)'
        projectsContentDivSubsResize.style.width = 'calc(100vw - 10vh)'
        projectsContentDivSubsResize.style.marginLeft = '10vh'
        stackTextResize.style.fontSize = '2rem'
        PressStartSmallerResize.style.fontSize = '1.5rem'
        doubleUpResize.style.transform = 'scale(1.5)'
        emailTextResize.style.fontSize = '3rem'

    }
    else {
        zoomFactor = 1
        scrollMainTextSize.style.fontSize = '10rem'
        scrollTopSize.style.fontSize = '10rem'
        scrollBottomSize.style.fontSize = '10rem'
        fromTheLeftSize.style.fontSize = '6rem'
        fromTheRightSize.style.fontSize = '6rem'
        pressStartSize.style.fontSize = '4rem'
        projectsContentResize.style.fontSize = '4rem'
        projectsDivResize.style.fontSize = '4rem'
        projectsDivResize.style.width = '10vh'
        projectsTextDivResize.style.height = '10vh'
        projectsTextDivResize.style.transform = 'rotate(90deg) translateY(-10vh) translateX(-300vh)'
        projectsContentDivSubsResize.style.width = 'calc(100vw - 10vh)'
        projectsContentDivSubsResize.style.marginLeft = '10vh'
        stackTextResize.style.fontSize = '2rem'
        PressStartSmallerResize.style.fontSize = '1.5rem'
        doubleUpResize.style.transform = 'scale(1.5)'
        emailTextResize.style.fontSize = '3rem'

    }
    isPortrait = true
}

window.addEventListener('resize', () => {

    if (isPhaseChanging == false) {
        if (isPortrait == true) {
            if (window.innerHeight < window.innerWidth) {
                location.reload()
                camera.position.x = camera.position.x/zoomFactor
                camera.position.z = camera.position.z/zoomFactor
                camera.position.y = camera.position.y
                if (phase == 0) {
                    camera.lookAt(0,30,0)
                }
                if (phase == 1) {
                    camera.position.set(9,9,9)
    
                    controls.saveState()
                }
                zoomFactor = 1
                scrollMainTextSize.style.fontSize = '15rem'
                scrollTopSize.style.fontSize = '15rem'
                scrollBottomSize.style.fontSize = '15rem'
                fromTheLeftSize.style.fontSize = '9rem'
                fromTheRightSize.style.fontSize = '9rem'
                pressStartSize.style.fontSize = '6rem'
                projectsContentResize.style.fontSize = '7.5rem'
                projectsDivResize.style.fontSize = '7.5rem'
                projectsDivResize.style.width = '20vh'
                projectsTextDivResize.style.height = '20vh'
                projectsTextDivResize.style.transform = 'rotate(90deg) translateY(-20vh) translateX(-300vh)'
                projectsContentDivSubsResize.style.width = 'calc(100vw - 20vh)'
                projectsContentDivSubsResize.style.marginLeft = '20vh'
                stackTextResize.style.fontSize = '3.5rem'
                PressStartSmallerResize.style.fontSize = '3rem'
                doubleUpResize.style.transform = 'scale(3)'
                emailTextResize.style.fontSize = '5.5rem'

            }
            isPortrait = false
        }
        else if (isPortrait == false) {
            if(window.innerHeight > window.innerWidth) {
                location.reload()
                if (window.innerWidth <= 320) {
                    zoomFactor = 5
                    scrollMainTextSize.style.fontSize = '10rem'
                    scrollTopSize.style.fontSize = '10rem'
                    scrollBottomSize.style.fontSize = '10rem'
                    fromTheLeftSize.style.fontSize = '6rem'
                    fromTheRightSize.style.fontSize = '6rem'
                    pressStartSize.style.fontSize = '4rem'
                    projectsContentResize.style.fontSize = '4rem'
                    projectsDivResize.style.fontSize = '4rem'
                    projectsDivResize.style.width = '10vh'
                    projectsTextDivResize.style.height = '10vh'
                    projectsTextDivResize.style.transform = 'rotate(90deg) translateY(-10vh) translateX(-300vh)'
                    projectsContentDivSubsResize.style.width = 'calc(100vw - 10vh)'
                    projectsContentDivSubsResize.style.marginLeft = '10vh'
                    stackTextResize.style.fontSize = '2rem'
                    PressStartSmallerResize.style.fontSize = '1.5rem'
                    doubleUpResize.style.transform = 'scale(1.5)'
                    emailTextResize.style.fontSize = '3rem'
                    
                }
                else if (window.innerWidth > 320 && window.innerWidth <= 375) {
                    zoomFactor = 4.5
                    scrollMainTextSize.style.fontSize = '10rem'
                    scrollTopSize.style.fontSize = '10rem'
                    scrollBottomSize.style.fontSize = '10rem'
                    fromTheLeftSize.style.fontSize = '6rem'
                    fromTheRightSize.style.fontSize = '6rem'
                    pressStartSize.style.fontSize = '4rem'
                    projectsContentResize.style.fontSize = '4rem'
                    projectsDivResize.style.fontSize = '4rem'
                    projectsDivResize.style.width = '10vh'
                    projectsTextDivResize.style.height = '10vh'
                    projectsTextDivResize.style.transform = 'rotate(90deg) translateY(-10vh) translateX(-300vh)'
                    projectsContentDivSubsResize.style.width = 'calc(100vw - 10vh)'
                    projectsContentDivSubsResize.style.marginLeft = '10vh'
                    stackTextResize.style.fontSize = '2rem'
                    PressStartSmallerResize.style.fontSize = '1.5rem'
                    doubleUpResize.style.transform = 'scale(1.5)'
                    emailTextResize.style.fontSize = '3rem'
                    
                }
                else if (window.innerWidth > 375 && window.innerWidth <= 425) {
                    zoomFactor = 4
                    scrollMainTextSize.style.fontSize = '10rem'
                    scrollTopSize.style.fontSize = '10rem'
                    scrollBottomSize.style.fontSize = '10rem'
                    fromTheLeftSize.style.fontSize = '6rem'
                    fromTheRightSize.style.fontSize = '6rem'
                    pressStartSize.style.fontSize = '4rem'
                    projectsContentResize.style.fontSize = '4rem'
                    projectsDivResize.style.fontSize = '4rem'
                    projectsDivResize.style.width = '10vh'
                    projectsTextDivResize.style.height = '10vh'
                    projectsTextDivResize.style.transform = 'rotate(90deg) translateY(-10vh) translateX(-300vh)'
                    projectsContentDivSubsResize.style.width = 'calc(100vw - 10vh)'
                    projectsContentDivSubsResize.style.marginLeft = '10vh'
                    stackTextResize.style.fontSize = '2rem'
                    PressStartSmallerResize.style.fontSize = '1.5rem'
                    doubleUpResize.style.transform = 'scale(1.5)'
                    emailTextResize.style.fontSize = '3rem'
                    
                    
                }
                else if (window.innerWidth > 425 && window.innerWidth <= 750) {
                    zoomFactor = 3
                    scrollMainTextSize.style.fontSize = '10rem'
                    scrollTopSize.style.fontSize = '10rem'
                    scrollBottomSize.style.fontSize = '10rem'
                    fromTheLeftSize.style.fontSize = '6rem'
                    fromTheRightSize.style.fontSize = '6rem'
                    pressStartSize.style.fontSize = '4rem'
                    projectsContentResize.style.fontSize = '4rem'
                    projectsDivResize.style.fontSize = '4rem'
                    projectsDivResize.style.width = '10vh'
                    projectsTextDivResize.style.height = '10vh'
                    projectsTextDivResize.style.transform = 'rotate(90deg) translateY(-10vh) translateX(-300vh)'
                    projectsContentDivSubsResize.style.width = 'calc(100vw - 10vh)'
                    projectsContentDivSubsResize.style.marginLeft = '10vh'
                    stackTextResize.style.fontSize = '2rem'
                    PressStartSmallerResize.style.fontSize = '1.5rem'
                    doubleUpResize.style.transform = 'scale(1.5)'
                    emailTextResize.style.fontSize = '3rem'
                    
                }
                else if (window.innerWidth > 750 && window.innerWidth <= 950) {
                    zoomFactor = 2.5
                    scrollMainTextSize.style.fontSize = '10rem'
                    scrollTopSize.style.fontSize = '10rem'
                    scrollBottomSize.style.fontSize = '10rem'
                    fromTheLeftSize.style.fontSize = '6rem'
                    fromTheRightSize.style.fontSize = '6rem'
                    pressStartSize.style.fontSize = '4rem'
                    projectsContentResize.style.fontSize = '4rem'
                    projectsDivResize.style.fontSize = '4rem'
                    projectsDivResize.style.width = '10vh'
                    projectsTextDivResize.style.height = '10vh'
                    projectsTextDivResize.style.transform = 'rotate(90deg) translateY(-10vh) translateX(-300vh)'
                    projectsContentDivSubsResize.style.width = 'calc(100vw - 10vh)'
                    projectsContentDivSubsResize.style.marginLeft = '10vh'
                    stackTextResize.style.fontSize = '2rem'
                    PressStartSmallerResize.style.fontSize = '1.5rem'
                    doubleUpResize.style.transform = 'scale(1.5)'
                    emailTextResize.style.fontSize = '3rem'
                    
                }
                else {
                    zoomFactor = 1
                    scrollMainTextSize.style.fontSize = '10rem'
                    scrollTopSize.style.fontSize = '10rem'
                    scrollBottomSize.style.fontSize = '10rem'
                    fromTheLeftSize.style.fontSize = '6rem'
                    fromTheRightSize.style.fontSize = '6rem'
                    pressStartSize.style.fontSize = '4rem'
                    projectsContentResize.style.fontSize = '4rem'
                    projectsDivResize.style.fontSize = '4rem'
                    projectsDivResize.style.width = '10vh'
                    projectsTextDivResize.style.height = '10vh'
                    projectsTextDivResize.style.transform = 'rotate(90deg) translateY(-10vh) translateX(-300vh)'
                    projectsContentDivSubsResize.style.width = 'calc(100vw - 10vh)'
                    projectsContentDivSubsResize.style.marginLeft = '10vh'
                    stackTextResize.style.fontSize = '2rem'
                    PressStartSmallerResize.style.fontSize = '1.5rem'
                    doubleUpResize.style.transform = 'scale(1.5)'
                    emailTextResize.style.fontSize = '3rem'
                    
                }
                camera.position.x = camera.position.x*zoomFactor
                camera.position.z = camera.position.z*zoomFactor
                camera.position.y = camera.position.y
    
                if (phase == 0) {
                    camera.lookAt(0,30,0)
                }
                if (phase == 1) {
                    camera.position.set(9*zoomFactor,9,9*zoomFactor)
    
                    controls.saveState()
                }            
            }
            isPortrait = true
        }
    }

    if (window.innerHeight < window.innerWidth) {
        isPortrait = false
    }

    else if (window.innerHeight > window.innerWidth) {
        isPortrait = true
    }
    
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 100)
// camera.rotation.y = Math.PI

scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
// controls.enabled = false

controls.enableDamping = true
controls.maxPolarAngle = Math.PI/2
controls.minAzimuthAngle = Math.PI*0/180
controls.maxAzimuthAngle = Math.PI*90/180
controls.minDistance = 10  
controls.maxDistance = 80

console.log(controls)




// Axes Helper
// const axesHelper = new THREE.AxesHelper()
// scene.add(axesHelper)

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap
renderer.outputEncoding = THREE.sRGBEncoding
renderer.toneMapping = THREE.CineonToneMapping

// outlineEffect.render(scene, camera)

// Mouse
 const mouse = new THREE.Vector2()

 window.addEventListener('mousemove', (event) =>
 {
     mouse.x = event.clientX / sizes.width * 2 - 1
     mouse.y = - (event.clientY / sizes.height) * 2 + 1

 })
var clickCounter = 0

let isLaptopOn = false
let isAnimationDone = false

// Raycaster
const raycaster = new THREE.Raycaster()

// Parallax Camera Group
const cameraGroup = new THREE.Group
cameraGroup.add(camera)
scene.add(cameraGroup)

// Object Positions

footballGroup.position.set(1.9,2.8,-1.9)
footballGroup.rotation.z = - Math.PI*40/180
footballGroup.rotation.y = - Math.PI*60/180

skateboardGroup.rotation.z = Math.PI
skateboardGroup.position.y = 6.1*0.05
skateboardGroup.position.z = 1.5
skateboardGroup.position.x = 1.5

// Mouse
const cursor = {}
cursor.x = 0
cursor.y = 0

// const cursorDiv = document.querySelector('.cursor')

window.addEventListener('mousemove', (event) =>
{
    cursor.x = event.clientX / sizes.width - 0.5
    cursor.y = event.clientY / sizes.height - 0.5

    // cursorDiv.setAttribute('style', 'top: '+(event.clientY - 10)+'px; left: '+(event.clientX - 10)+'px;')
})

// Particles
const particlesCount = 70000
const positions = new Float32Array(particlesCount * 3)

for (let i=0; i<particlesCount*3; i++) {
    positions[i*3 + 0] = ( Math.random() - 0.5 ) * 200
    positions[i*3 + 1] = ( Math.random() - 0.5 ) * 300 + ( Math.random() * 10 )
    positions[i*3 + 2] = ( Math.random() - 0.5 ) * 200
}

const particlesGeometry = new THREE.BufferGeometry()
particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))

const particlesMaterial = new THREE.PointsMaterial({
    color: '#ffffff',
    size: 0.03,
    sizeAttenuation: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending
})

const particles = new THREE.Points(particlesGeometry, particlesMaterial)
scene.add(particles)

/**
 * Animate
 */
 let prevTime = 0
 let isTopHalfFloating = false
let currentIntersect = null


let prevParallaxTime = 0
let firstCurrentIntersect = null
let isParallaxOn = false

let scrollTop = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop

const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()
    let deltaTime = elapsedTime - prevTime
    // prevTime = elapsedTime
    let parallaxTIme = elapsedTime - prevParallaxTime
    prevParallaxTime = elapsedTime

    // Shooting Star


    // Phase 0 Animations
    if (phase == 0) {
        // Parallax
        if (isParallaxOn == true) {
            const parallaxX = cursor.x * 0.1
            const parallaxY = - cursor.y * 0.1
            cameraGroup.position.x += ( parallaxX - cameraGroup.position.x ) * 2 * parallaxTIme
            cameraGroup.position.y += ( parallaxY - cameraGroup.position.y ) * 2 * parallaxTIme
            cameraGroup.position.z += ( - parallaxX - cameraGroup.position.z ) * 2 * parallaxTIme
        }

        // Arrow bobbles
        P.position.z = - Math.sin(elapsedTime*2) * 0.05 - 105*0.025
        K.position.z = Math.sin(elapsedTime*2) * 0.05 + 105*0.025
    }

    //Particles following cursor 
    if (phase !== 0) {
        const parallaxX = cursor.x * 0.1
        const parallaxY = - cursor.y * 0.1
        particles.position.x += - ( parallaxX - cameraGroup.position.x ) * parallaxTIme
        particles.position.y += - ( parallaxY - cameraGroup.position.y ) * parallaxTIme
        particles.position.z += - ( - parallaxX - cameraGroup.position.z ) * parallaxTIme
    }

    // Animations
    if (topBedframeGroup.position.y == 4 && isTopHalfFloating == false) {
        isTopHalfFloating = true
        prevTime = elapsedTime
        deltaTime = 0
    } 

    if (isTopHalfFloating == true) {
        topBedframeGroup.position.y = Math.cos(deltaTime)*0.2 + 3.8
    } 

    //Raycaster 
    raycaster.setFromCamera(mouse, camera)

    // Phase 0 RayCasting
    const firstTestBox = [P, A, T, R, I, C, K, rightNameWall, leftNameWall]
    const firstIntersects = raycaster.intersectObjects(firstTestBox)

    for (const firstIntersect of firstIntersects) {
        // console.log('hovering')  
    }

    if (firstIntersects.length) {
        if (firstCurrentIntersect === null) {
            firstCurrentIntersect = firstIntersects[0]
            // console.log(firstCurrentIntersect.object)

        }
    }
    else {
        if (firstCurrentIntersect) {
            firstCurrentIntersect = null
        }
        firstCurrentIntersect = null
        // console.log(currentIntersect)
    }

    // Phase 1 RayCasting
    // if (phase == 1) {
        const testBox = [topBedframeGroup, topDrawer, midDrawer, botDrawer, laptopGroup, footballGroup, skateboardGroup, sablayGroup, switchGroup, joyConGroup, switchDock, headphoneGroup, spoolGroup, printerStatic, printerPlate, printerTip, curtainsScale, staticBook, tvBase, tvScreen]
        const intersects = raycaster.intersectObjects(testBox)
    
        for (const object of testBox) {
            // console.log('none')
        }
    
        for (const intersect of intersects) {
            // console.log('hovering')  
        }
    
        if (intersects.length) {
            if (currentIntersect === null) {
                // console.log(intersects)
                currentIntersect = intersects[0]
            }
        }
        else {
            if (currentIntersect) {
                currentIntersect = null
            }
            currentIntersect = null
            // console.log(currentIntersect)
        }
    // }

    scrollTop = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;

    // Test Anims
    // spoolGroup.rotation.x += elapsedTime * 0.005

    // Update controls
    if (controls.enabled == true) {
        controls.update()
    }

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)

    // fps from 70 to 130+ constant
    // setTimeout(() => {
    //     window.requestAnimationFrame(tick)
    // }, 1000/100)
}

tick()

// Phase initialization

// GSAP Animations

const hoverTopBedframeGroup = () => {
    isAnimationPlaying = true
    setTimeout(() => {
        isAnimationPlaying = false
    }, 1000)

    
    gsap.to(topBedframeGroup.position, {duration: 1, delay: 0, y: 4})
    // moveObjects()
}

const topDrawerOut = () => {
    isAnimationPlaying = true
    setTimeout(() => {
        isAnimationPlaying = false
    }, 1000)

    
    gsap.to(topDrawer.position, {duration: 1, delay: 0, z: 13*0.05})
    gsap.to(topDrawer.position, {duration: 1, delay: 2, z: 0})
}

const midDrawerOut = () => {
    isAnimationPlaying = true
    setTimeout(() => {
        isAnimationPlaying = false
    }, 1000)

    
    gsap.to(midDrawer.position, {duration: 1, delay: 0, z: 13*0.05})
    gsap.to(midDrawer.position, {duration: 1, delay: 2, z: 0})
}

const botDrawerOut = () => {
    isAnimationPlaying = true
    setTimeout(() => {
        isAnimationPlaying = false
    }, 1000)

    
    gsap.to(botDrawer.position, {duration: 1, delay: 0, z: 13*0.05})
    gsap.to(botDrawer.position, {duration: 1, delay: 2, z: 0})
}

const lightLaptop = () => {
    isAnimationPlaying = true
    setTimeout(() => {
        isAnimationPlaying = false
    }, 1000)

    
    
    scene.add(rectAreaLight)

    // scene.remove(ambientLight)
    // scene.add(offAmbientLight)
    // scene.remove(pointLight)
    // scene.add(offPointLight)
    // scene.background = new THREE.Color(0x000000)
    
    screenGroup.children[0].children[0].material.emissive.r = 1
    screenGroup.children[0].children[0].material.emissive.g = 1
    screenGroup.children[0].children[0].material.emissive.b = 1

    // allObjects.add(galaxy)

    setTimeout(() => {
        scene.remove(rectAreaLight)

        // scene.add(ambientLight)
        // scene.remove(offAmbientLight)
        // scene.add(pointLight)
        // scene.remove(offPointLight)
        // scene.background = new THREE.Color(0x000000)
        
        screenGroup.children[0].children[0].material.emissive.r = 0
        screenGroup.children[0].children[0].material.emissive.g = 0
        screenGroup.children[0].children[0].material.emissive.b = 0
    
        // allObjects.remove(galaxy) 
    }, 450)

    setTimeout(() => {
        scene.add(rectAreaLight)

        scene.remove(ambientLight)
        scene.add(offAmbientLight)
        scene.remove(pointLight)
        scene.add(offPointLight)
        scene.background = new THREE.Color(0x000000)
        
        screenGroup.children[0].children[0].material.emissive.r = 1
        screenGroup.children[0].children[0].material.emissive.g = 1
        screenGroup.children[0].children[0].material.emissive.b = 1

        // allObjects.add(galaxy)

        isAnimationDone = true
    }, 1000)

    isLaptopOn = true
}

const floatFootball = () => {
    isAnimationPlaying = true
    setTimeout(() => {
        isAnimationPlaying = false
    }, 1000)

    

    gsap.set(footballGroup.rotation, {z: - Math.PI*40/180, x: 0})
    gsap.to(footballGroup.position, {ease: 'Power3.easeOut', duration: 0.75, delay: 0, y: 4})
    gsap.to(footballGroup.position, {ease: 'Power3.easeIn', duration: 0.75, delay: 0.75, y: 2.8})

    gsap.to(footballGroup.rotation, {ease: 'Power3.easeOut',duration: 0.5, delay: 0, x: - Math.PI*45/180})
    gsap.to(footballGroup.rotation, {duration: 1.4, delay: 0, z: Math.PI*2*4 - Math.PI*40/180})
    gsap.to(footballGroup.rotation, {ease: 'Power1.easeIn', duration: 0.5, delay: 0.5, x: Math.PI*45/180})
 
    
    gsap.to(footballGroup.rotation, {ease: 'Power1.easeInOut', duration: 0.25, delay: 1.4, x: 0})

    // moveObjects()
}

const flipBoard = () => {
    isAnimationPlaying = true
    setTimeout(() => {
        isAnimationPlaying = false
    }, 1000)

    
    gsap.set(skateboardGroup.rotation, {z: Math.PI, y: 0})
    gsap.to(skateboardGroup.position, {ease: 'Power1.easeOut', duration: 0.6, delay: 0, y: 1})
    gsap.to(skateboardGroup.rotation, {ease: 'Power0.easeNone', duration: 1, delay: 0.05, z: Math.PI*2 + Math.PI, y: Math.PI*2})
    gsap.to(skateboardGroup.position, {ease: 'Power1.easeIn', duration: 0.45, delay: 0.5, y: 6.1*0.05})

    // moveObjects()
}

const switchJump = () => {
    isAnimationPlaying = true
    setTimeout(() => {
        isAnimationPlaying = false
    }, 1000)

    
    gsap.to(joyConGroup.position, {ease: 'Power1.easeOut', duration: 1, delay: 0, y: 0.5})
    gsap.to(joyConGroup.position, {ease: 'Power1.easeIn', duration: 0.5, delay: 1, y: 0})
    gsap.to(switchGroup.position, {ease: 'Power1.easeOut', duration: 0.5, delay: 0.5, y: 0.5})
    gsap.to(switchGroup.position, {ease: 'Power1.easeIn', duration: 0.5, delay: 1, y: 0})
    gsap.to(switchScreen.position, {ease: 'Power1.easeOut', duration: 0.5, delay: 0.5, y: 0.5})
    gsap.to(switchScreen.position, {ease: 'Power1.easeIn', duration: 0.5, delay: 1, y: 0})

    setTimeout(() => {
        switchScreen.children[0].children[0].material.emissive.r = 1
        switchScreen.children[0].children[0].material.emissive.g = 1
        switchScreen.children[0].children[0].material.emissive.b = 1
    }, 850)

    setTimeout(() => {
        switchScreen.children[0].children[0].material.emissive.r = 0
        switchScreen.children[0].children[0].material.emissive.g = 0
        switchScreen.children[0].children[0].material.emissive.b = 0
    }, 1450)

}

const printerAnim = () => {
    isAnimationPlaying = true
    setTimeout(() => {
        isAnimationPlaying = false
    }, 1000)

    gsap.to(printerPlate.position, {ease: 'Power1.easeOut', duration: 1, delay: 0, x: 0.4})
    gsap.to(printerPlate.position, {ease: 'Power1.easeIn', duration: 1, delay: 1, x: 0})
    gsap.to(printerTip.position, {ease: 'Power1.easeOut', duration: 1, delay: 0, z: -0.6})
    gsap.to(printerTip.position, {ease: 'Power1.easeIn', duration: 1, delay: 1, z: 0})
    gsap.to(spoolGroup.rotation, {ease: 'Power1.easeOut', duration: 1, delay: 0, x: - Math.PI*120/180})
    gsap.to(spoolGroup.rotation, {ease: 'Power1.easeIn', duration: 1, delay: 1, x: 0})

}

let isCurtainOpen = false

const scaleCurtains = () => {
    isAnimationPlaying = true
    setTimeout(() => {
        isAnimationPlaying = false
    }, 1000)

    if (isCurtainOpen == true) {
        gsap.to(curtainsScale.children[0].children[0].scale, {ease: 'Power1.easeOut', duration: 1, delay: 0, x: 1})
        gsap.to(curtainsScale.children[0].children[0].position, {ease: 'Power1.easeOut', duration: 1, delay: 0, z: 0})
        isCurtainOpen = false
    }

    else if (isCurtainOpen == false) {
        gsap.to(curtainsScale.children[0].children[0].scale, {ease: 'Power1.easeOut', duration: 1, delay: 0, x: 0.5})
        gsap.to(curtainsScale.children[0].children[0].position, {ease: 'Power1.easeOut', duration: 1, delay: 0, z: -17.5})
        isCurtainOpen = true
    }
}

const moveBook = () => {
    isAnimationPlaying = true
    setTimeout(() => {
        isAnimationPlaying = false
    }, 1000)

    gsap.to(movingBook.position, {ease: 'Power1.easeOut', duration: 1, delay: 0, z: 2*0.05})
    gsap.to(movingBook.position, {ease: 'Power1.easeOut', duration: 1, delay: 1, z: 0})
}

const tvOpen = () => {
    isAnimationPlaying = true
    setTimeout(() => {
        isAnimationPlaying = false
    }, 1000)

    tvScreen.children[0].children[0].material.emissive.r = 1
    tvScreen.children[0].children[0].material.emissive.g = 1
    tvScreen.children[0].children[0].material.emissive.b = 1

    setTimeout(() => {
        
        tvScreen.children[0].children[0].material.emissive.r = 0
        tvScreen.children[0].children[0].material.emissive.g = 0
        tvScreen.children[0].children[0].material.emissive.b = 0
    
    }, 2000)
}

// Global Light Phase 0
const leftDirectionalLight = new THREE.DirectionalLight(0xff0000, 0)
const rightDirectionalLight = new THREE.DirectionalLight(0xffffff, 0)

const colorChangeRight = () => {
    if (currentColor < directionalLightColors.length - 1) {
        currentColor += 1
    }

    else if (currentColor == directionalLightColors.length - 1) {
        currentColor = 0
    }
    // 2: Strip Color, 3: SubColor

    document.styleSheets[5].cssRules[40].style.backgroundColor = directionalLightColors[currentColor][2]
    document.styleSheets[5].cssRules[40].style.borderColor = directionalLightColors[currentColor][2]
    document.styleSheets[5].cssRules[39].style.backgroundColor = directionalLightColors[currentColor][3]
    document.styleSheets[5].cssRules[39].style.borderColor = directionalLightColors[currentColor][3]
    document.styleSheets[5].cssRules[17].style.color = directionalLightColors[currentColor][2]
    document.styleSheets[5].cssRules[9].style.backgroundColor = directionalLightColors[currentColor][2]
    document.styleSheets[5].cssRules[44].style.color = directionalLightColors[currentColor][2]
    document.styleSheets[5].cssRules[45].style.color = directionalLightColors[currentColor][3]
    document.styleSheets[5].cssRules[46].style.color = directionalLightColors[currentColor][2]
    document.styleSheets[5].cssRules[49].style.color = directionalLightColors[currentColor][3]
    document.styleSheets[5].cssRules[56].style.color = directionalLightColors[currentColor][3]
    document.styleSheets[5].cssRules[57].style.color = directionalLightColors[currentColor][3]
    document.styleSheets[5].cssRules[66].style.color = directionalLightColors[currentColor][2]
    document.styleSheets[5].cssRules[62].style.color = directionalLightColors[currentColor][2]
    document.styleSheets[5].cssRules[71].style.webkitTextStrokeColor = directionalLightColors[currentColor][2]
    document.styleSheets[5].cssRules[72].style.webkitTextStrokeColor = directionalLightColors[currentColor][3]
    document.styleSheets[5].cssRules[78].style.textShadow = '0 0 0.3rem black, -0.25rem 0.25rem 0.1rem '+ directionalLightColors[currentColor][3] +', -0.3rem 0.3rem 0.1rem black'
    document.styleSheets[5].cssRules[79].style.textShadow = '0 0 0.3rem black, 0.25rem 0.25rem 0.1rem '+ directionalLightColors[currentColor][2] +', 0.3rem 0.3rem 0.1rem black'
    document.styleSheets[5].cssRules[114].style.backgroundColor = directionalLightColors[currentColor][2]
    document.styleSheets[5].cssRules[114].style.color = directionalLightColors[currentColor][3]
    document.styleSheets[5].cssRules[115].style.color = directionalLightColors[currentColor][3]
    document.styleSheets[5].cssRules[110].style.textDecorationColor = directionalLightColors[currentColor][3]
    document.styleSheets[5].cssRules[116].style.textDecorationColor = directionalLightColors[currentColor][3]
    document.styleSheets[5].cssRules[119].style.textDecorationColor = directionalLightColors[currentColor][2]

    leftDirectionalLight.color.setHex(directionalLightColors[currentColor][0])
    rightDirectionalLight.color.setHex(directionalLightColors[currentColor][1])  
} 

// console.log(leftDirectionalLight)

// Light Up Animation
const lightUp = () => {
    gsap.to(leftDirectionalLight, {ease: 'Power1.easeOut', duration: 3, intensity: 0.7})
    gsap.to(rightDirectionalLight, {ease: 'Power1.easeOut', duration: 3, intensity: 0.7})
}

// Start Sequence after loading
const startSequence = () => {
    setTimeout(() => { 
        scene.remove(ambientLight)
        scene.remove(pointLight)
        // scene.add(leftDirectionalLight)
        // scene.add(rightDirectionalLight)
        lightUp()

        noClicks = false
        isParallaxOn = true
    }, 1000)
}

if (phase == 0) {
    
    scene.add(leftDirectionalLight)
    scene.add(rightDirectionalLight)

    scene.add(ambientLight)
    scene.add(pointLight)


    controls.enabled = false
    controls.enableZoom = false
    controls.enablePan = false
    controls.enableRotate = false
    controls.target.set(0,30,0)

    camera.position.set(5*zoomFactor,35,5*zoomFactor)
    camera.lookAt(0*zoomFactor,0+30,0*zoomFactor)

    scene.background = new THREE.Color(0x000000)

    P.position.set(-105*0.025, 0, -105*0.025)
    A.position.set(-70*0.025, -0, -70*0.025)
    T.position.set(-35*0.025, 0, -35*0.025)
    R.position.set(0, 0, 0)
    I.position.set(35*0.025, 0, 35*0.025)
    C.position.set(70*0.025, 0, 70*0.025)
    K.position.set(105*0.025, 0, 105*0.025)

    nameGroup.add(P)
    nameGroup.add(A)
    nameGroup.add(T)
    nameGroup.add(R)
    nameGroup.add(I)
    nameGroup.add(C)
    nameGroup.add(K)

    leftNameWallPosition.position.y = -1+30+ 15*0.025
    leftNameWallPosition.position.x = - 5

    rightNameWallPosition.position.y = -1+30+ 15*0.025
    rightNameWallPosition.position.z = - 5

    nameGroup.position.y = -1+30
    nameGroup.rotation.y = Math.PI*90/180
    leftNameWallPosition.rotation.y = Math.PI*90/180
    rightNameWallPosition.rotation.y = Math.PI*90/180

    scene.add(nameGroup)
    leftNameWallPosition.add(leftNameWall)
    scene.add(leftNameWallPosition)
    rightNameWallPosition.add(rightNameWall)
    scene.add(rightNameWallPosition)

    // scene.add(ambientLight)
    // scene.add(pointLight)

    const firstAmbientLight = new THREE.AmbientLight(0x000000, 0.1)
    scene.add(firstAmbientLight)    

    leftDirectionalLight.position.set(0,30,40)
    leftDirectionalLight.target.position.set(0,30,0)
    scene.add(leftDirectionalLight.target)

    leftDirectionalLight.castShadow = true
    leftDirectionalLight.shadow.mapSize.x = 1024*4
    leftDirectionalLight.shadow.mapSize.y = 1024*4
    leftDirectionalLight.shadow.camera.near = 5
    leftDirectionalLight.shadow.camera.far = 60
    leftDirectionalLight.shadow.normalBias = 0.05

    rightDirectionalLight.position.set(40,30, 0)
    rightDirectionalLight.target.position.set(0,30,0)
    scene.add(rightDirectionalLight.target)

    rightDirectionalLight.castShadow = true
    rightDirectionalLight.shadow.mapSize.x = 1024*4
    rightDirectionalLight.shadow.mapSize.y = 1024*4
    rightDirectionalLight.shadow.camera.near = 5
    rightDirectionalLight.shadow.camera.far = 60
    rightDirectionalLight.shadow.normalBias = 0.05
    
    // const firstPointLight = new THREE.PointLight(0xffffff, 0.1)
    // firstPointLight.position.set(-10,10,10)
    // scene.add(firstPointLight)
}

 // RayCasting
let isAnimationPlaying = false
const turnLaptopOn = document.getElementById('turnLaptopOn')
let isTextAtTheBottom = false
let isItEverOn = false


window.addEventListener('click', () => {
    if (isAnimationPlaying == false && noClicks == false) {
        clickCounter += 1
        // console.log(clickCounter)
        if (phase == 0) {
            if (firstCurrentIntersect) {
                // console.log('click')
                if (firstCurrentIntersect.object == P.children[0].children[0]) {
                    if (clickCounter%2 == 0) {
                        animateP()
                    }
                    firstCurrentIntersect = null
                }
                else if (firstCurrentIntersect.object == A.children[0].children[0]) {
                    if (clickCounter%2 == 0) {
                        animateA()
                    }
                    firstCurrentIntersect = null
                }
                else if (firstCurrentIntersect.object == T.children[0].children[0]) {
                    if (clickCounter%2 == 0) {
                        animateT()
                    }
                    firstCurrentIntersect = null
                }
                else if (firstCurrentIntersect.object == R.children[0].children[0]) {
                    if (clickCounter%2 == 0) {
                        animateR()
                    }
                    firstCurrentIntersect = null
                }
                else if (firstCurrentIntersect.object == I.children[0].children[0]) {
                    if (clickCounter%2 == 0) {
                        animateI()
                    }
                    firstCurrentIntersect = null
                }
                else if (firstCurrentIntersect.object == C.children[0].children[0]) {
                    if (clickCounter%2 == 0) {
                        animateC()
                    }
                    firstCurrentIntersect = null
                }
                else if (firstCurrentIntersect.object == K.children[0].children[0]) {
                    if (clickCounter%2 == 0) {
                        animateK()
                    }
                    firstCurrentIntersect = null
                }
                else if (firstCurrentIntersect.object == rightNameWall.children[0].children[0]) {
                    if (clickCounter%2 == 0) {
                        spinRightWall()
                    }
                    firstCurrentIntersect = null
                }
                else if (firstCurrentIntersect.object == leftNameWall.children[0].children[0]) {
                    if (clickCounter%2 == 0) {
                        spinLeftWall()
                    }
                    firstCurrentIntersect = null
                }
            }
        }
    
    
        if (phase == 1) {
            if (currentIntersect) {
                console.log('click')
                    if (currentIntersect.object == laptopGroup.children[0].children[0] || currentIntersect.object == laptopGroup.children[1].children[0] || currentIntersect.object == screenGroup.children[0].children[0]) {
                        if (clickCounter%2 == 0) {
                            if (isLaptopOn == false) {
                                lightLaptop()

                                if (isItEverOn == false) {
                                    gsap.to(turnLaptopOn, {duration: 1, opacity: 0})
                                    setTimeout(() => {
                                        turnLaptopOn.style.display = 'none'
                                    }, 1000)
                                    isItEverOn = true
                                    isTextAtTheBottom = false

                                    setTimeout(() => {
                                        arrayIndex = 0
                                        insertModal(arrayIndex)
                                    }, 1250)

                                    setTimeout(() => {
                                        hoverTopBedframeGroup()
                                    }, 2000)
                                }

                                else if (isItEverOn == true) {
                                    arrayIndex = 1
                                    insertModal(arrayIndex) 
                                }
                            }
                            else if (isLaptopOn == true && isAnimationDone == true) {
                                arrayIndex = 1
                                insertModal(arrayIndex)
                            }
                        }
                        currentIntersect = null
                    }
                if (isLaptopOn == true) {
                    if (currentIntersect.object == topBedframeGroup.children[0].children[0] || currentIntersect.object == topBedframeGroup.children[1].children[0] || currentIntersect.object == topBedframeGroup.children[2].children[0] || currentIntersect.object == topBedframeGroup.children[3].children[0]) {
                        if (clickCounter%2 == 0) {
                            // hoverTopBedframeGroup()
                        }
                        currentIntersect = null
                    }
                    else if (currentIntersect.object == topDrawer.children[0].children[0]) {
                        if (clickCounter%2 == 0) {
                            topDrawerOut()
                        }
                        currentIntersect = null
                    }
                    else if (currentIntersect.object == midDrawer.children[0].children[0]) {
                        if (clickCounter%2 == 0) {
                            midDrawerOut()
                        }
                        currentIntersect = null
                    }
                    else if (currentIntersect.object == botDrawer.children[0].children[0]) {
                        if (clickCounter%2 == 0) {
                            botDrawerOut()
                        }
                        currentIntersect = null
                    }
                    else if (currentIntersect.object == footballGroup.children[0].children[0] || currentIntersect.object == footballGroup.children[1].children[0]) {
                        if (clickCounter%2 == 0) {
                            // openLaptop()
                            // console.log('animate laptop')
                            // console.log('change screen texture')
            
                            floatFootball()
        
                            arrayIndex = 2
                            insertModal(arrayIndex)
                        }
                        currentIntersect = null
                    }
                    else if (currentIntersect.object == skateboardGroup.children[0].children[0] || currentIntersect.object == skateboardGroup.children[1].children[0] || currentIntersect.object == skateboardGroup.children[2].children[0] ||currentIntersect.object == skateboardGroup.children[3].children[0]) {
                        if (clickCounter%2 == 0) {
                            // openLaptop()
                            // console.log('animate laptop')
                            // console.log('change screen texture')
                            flipBoard()
        
                            arrayIndex = 3
                            insertModal(arrayIndex)
                        }
                        currentIntersect = null
                    }
                    else if (currentIntersect.object == sablayGroup.children[0].children[0] || currentIntersect.object == sablayGroup.children[0].children[1] || currentIntersect.object == sablayGroup.children[0].children[2] || currentIntersect.object == sablayGroup.children[0].children[3] || currentIntersect.object == sablayGroup.children[0].children[4] || currentIntersect.object == sablayGroup.children[0].children[5] || currentIntersect.object == sablayGroup.children[0].children[6] || currentIntersect.object == sablayGroup.children[0].children[7] ) {
                        if (clickCounter%2 == 0) {
                            // openLaptop()
                            // console.log('animate laptop')
                            // console.log('change screen texture')
                            // !!! sunflowers()
        
                            arrayIndex = 4
                            insertModal(arrayIndex)
                        }
                        currentIntersect = null
                    }
                    else if (currentIntersect.object == switchGroup.children[0].children[0] || currentIntersect.object == switchScreen.children[0].children[0] || currentIntersect.object == joyConGroup.children[0].children[0] || currentIntersect.object == joyConGroup.children[1].children[0] || currentIntersect.object == joyConGroup.children[2].children[0] || currentIntersect.object == switchDock.children[0].children[0]) {
                        if (clickCounter%2 == 0) {
                            // openLaptop()
                            // console.log('animate laptop')
                            // console.log('change screen texture')
                            switchJump()
        
                            arrayIndex = 6
                            insertModal(arrayIndex)
                        }
                        currentIntersect = null
                    }
                    else if (currentIntersect.object == headphoneGroup.children[0].children[0] || currentIntersect.object == headphoneGroup.children[1].children[0]) {
                        if (clickCounter%2 == 0) {
                            // openLaptop()
                            // console.log('animate laptop')
                            // console.log('change screen texture')
                            // !!! notesPlaying()
        
                            arrayIndex = 5
                            insertModal(arrayIndex)
                        }
                        currentIntersect = null
                    }

                    else if (currentIntersect.object == spoolGroup.children[0].children[0] || currentIntersect.object == spoolGroup.children[1].children[0]|| currentIntersect.object == printerStatic.children[0].children[0] || currentIntersect.object == printerStatic.children[0].children[1] || currentIntersect.object == printerPlate.children[0].children[0] || currentIntersect.object == printerTip.children[0].children[0]) {
                        if (clickCounter%2 == 0) {
                            printerAnim()

                            arrayIndex = 7
                            insertModal(arrayIndex)
                        }
                        currentIntersect = null
                    }

                    else if (currentIntersect.object == curtainsScale.children[0].children[0]) {
                        if (clickCounter%2 == 0) {
                            scaleCurtains()

                        }
                        currentIntersect = null
                    }

                    else if (currentIntersect.object == staticBook.children[0].children[0] || currentIntersect.object == staticBook.children[0].children[1] || currentIntersect.object == staticBook.children[0].children[2] || currentIntersect.object == staticBook.children[0].children[3] || currentIntersect.object == staticBook.children[0].children[4] || currentIntersect.object == staticBook.children[0].children[5] || currentIntersect.object == staticBook.children[0].children[6]) {
                        if (clickCounter%2 == 0) {
                            moveBook()

                        }
                        currentIntersect = null
                    }

                    else if (currentIntersect.object == tvBase.children[0].children[0] || currentIntersect.object == tvScreen.children[0].children[0]) {
                        if (clickCounter%2 == 0) {
                            tvOpen()

                        }
                        currentIntersect = null
                    }
                }
            }
        }
    }
})

// Test Logs
console.log(staticBook)

// GSAP Animations for Phase 0
let isPRotated = false
let isARotated = false
let isTRotated = false
let isRRotated = false
let isIRotated = false
let isCRotated = false
let isKRotated = false

const animateP = () => {
    isAnimationPlaying = true
    setTimeout(() => {
        isAnimationPlaying = false
    }, 1000)

    gsap.set(P.rotation, {y: P.rotation.y})
    if (isPRotated == false) {
        gsap.to(P.rotation, {duration: 1, delay: 0, y: P.rotation.y + Math.PI*90/180})
        isPRotated = true
    }
    else {
        gsap.to(P.rotation, {duration: 1, delay: 0, y: P.rotation.y - Math.PI*90/180})
        isPRotated = false
    }
}

const animateA = () => {
    isAnimationPlaying = true
    setTimeout(() => {
        isAnimationPlaying = false
    }, 1000)

    gsap.set(A.rotation, {y: A.rotation.y})
    if (isARotated == false) {
        gsap.to(A.rotation, {duration: 1, delay: 0, y: A.rotation.y + Math.PI*90/180})
        isARotated = true
    }
    else {
        gsap.to(A.rotation, {duration: 1, delay: 0, y: A.rotation.y - Math.PI*90/180})
        isARotated = false
    }
}

const animateT = () => {
    isAnimationPlaying = true
    setTimeout(() => {
        isAnimationPlaying = false
    }, 1000)

    gsap.set(T.rotation, {y: T.rotation.y})
    if (isTRotated == false) {
        gsap.to(T.rotation, {duration: 1, delay: 0, y: T.rotation.y + Math.PI*90/180})
        isTRotated = true
    }
    else {
        gsap.to(T.rotation, {duration: 1, delay: 0, y: T.rotation.y - Math.PI*90/180})
        isTRotated = false
    }
}

const animateR = () => {
    isAnimationPlaying = true
    setTimeout(() => {
        isAnimationPlaying = false
    }, 1000)

    gsap.set(R.rotation, {y: R.rotation.y})
    if (isRRotated == false) {
        gsap.to(R.rotation, {duration: 1, delay: 0, y: R.rotation.y + Math.PI*90/180})
        isRRotated = true
    }
    else {
        gsap.to(R.rotation, {duration: 1, delay: 0, y: R.rotation.y - Math.PI*90/180})
        isRRotated = false
    }
}

const animateI = () => {
    isAnimationPlaying = true
    setTimeout(() => {
        isAnimationPlaying = false
    }, 1000)

    gsap.set(I.rotation, {y: I.rotation.y})
    if (isIRotated == false) {
        gsap.to(I.rotation, {duration: 1, delay: 0, y: I.rotation.y + Math.PI*90/180})
        isIRotated = true
    }
    else {
        gsap.to(I.rotation, {duration: 1, delay: 0, y: I.rotation.y - Math.PI*90/180})
        isIRotated = false
    }
}

const animateC = () => {
    isAnimationPlaying = true
    setTimeout(() => {
        isAnimationPlaying = false
    }, 1000)

    gsap.set(C.rotation, {y: C.rotation.y})
    if (isCRotated == false) {
        gsap.to(C.rotation, {duration: 1, delay: 0, y: C.rotation.y + Math.PI*90/180})
        isCRotated = true
    }
    else {
        gsap.to(C.rotation, {duration: 1, delay: 0, y: C.rotation.y - Math.PI*90/180})
        isCRotated = false
    }
}

const animateK = () => {
    isAnimationPlaying = true
    setTimeout(() => {
        isAnimationPlaying = false
    }, 1000)

    gsap.set(K.rotation, {y: K.rotation.y})
    if (isKRotated == false) {
        gsap.to(K.rotation, {duration: 1, delay: 0, y: K.rotation.y + Math.PI*90/180})
        isKRotated = true
    }
    else {
        gsap.to(K.rotation, {duration: 1, delay: 0, y: K.rotation.y - Math.PI*90/180})
        isKRotated = false
    }
}

const spinLeftWall = () => {
    isAnimationPlaying = true
    setTimeout(() => {
        isAnimationPlaying = false
    }, 1000)

    gsap.set(leftNameWall.rotation, {x: leftNameWall.rotation.x, y: 0, z: 0})
    gsap.to(leftNameWall.rotation, {duration: 1, x: Math.PI + leftNameWall.rotation.x})

    if (isPRotated == true) {
        gsap.to(P.rotation, {duration: 1, delay: 0, y: P.rotation.y - Math.PI*90/180})
        isPRotated = false
    }
    if (isARotated == true) {
        gsap.to(A.rotation, {duration: 1, delay: 0, y: A.rotation.y - Math.PI*90/180})
        isARotated = false
    }
    if (isTRotated == true) {
        gsap.to(T.rotation, {duration: 1, delay: 0, y: T.rotation.y - Math.PI*90/180})
        isTRotated = false
    }
    if (isRRotated == true) {
        gsap.to(R.rotation, {duration: 1, delay: 0, y: R.rotation.y - Math.PI*90/180})
        isRRotated = false
    }
    if (isIRotated == true) {
        gsap.to(I.rotation, {duration: 1, delay: 0, y: I.rotation.y - Math.PI*90/180})
        isIRotated = false
    }
    if (isCRotated == true) {
        gsap.to(C.rotation, {duration: 1, delay: 0, y: C.rotation.y - Math.PI*90/180})
        isCRotated = false
    }
    if (isKRotated == true) {
        gsap.to(K.rotation, {duration: 1, delay: 0, y: K.rotation.y - Math.PI*90/180})
        isKRotated = false
    }
}

const spinRightWall = () => {
    isAnimationPlaying = true
    setTimeout(() => {
        colorChangeRight()
    }, 0)

    setTimeout(() => {
        isAnimationPlaying = false
    }, 1000)

    gsap.set(rightNameWall.rotation, {x: rightNameWall.rotation.x, y: 0, z: 0})
    gsap.to(rightNameWall.rotation, {duration: 1, z: Math.PI + rightNameWall.rotation.x})
}

// Side Bar
let isArrowClickAllowed = true

const sidebarCircleOne = document.getElementById('sidebarCircleOne')
const sidebarCircleTwo = document.getElementById('sidebarCircleTwo')
const sidebarCircleThree = document.getElementById('sidebarCircleThree')
const upArrow = document.getElementById('up')
const downArrow = document.getElementById('down')

// Clicking Links

let currentLink = 0

upArrow.addEventListener('click', () => {
    if (isArrowClickAllowed == true && noClicks == false) {
        if (currentLink == 1) {
            isArrowClickAllowed = false
            phaseChange1to0(leftDirectionalLight, rightDirectionalLight, zoomFactor)

            setTimeout(() => {
                sidebarCircleOne.classList.add('current')
                sidebarCircleTwo.classList.remove('current')
                sidebarCircleThree.classList.remove('current')
               
            }, 500)
        }
        else if (currentLink == 2 && scrollTop == 0) {
            // Temporary
            phaseChange2to1(zoomFactor)

            setTimeout(() => {
                sidebarCircleOne.classList.remove('current')
                sidebarCircleTwo.classList.add('current')
                sidebarCircleThree.classList.remove('current')
               
            }, 500)
        }
    }
})

downArrow.addEventListener('click', () => {
    if (isArrowClickAllowed == true && noClicks == false) {
        if (currentLink == 0) {
            isArrowClickAllowed = false
            phaseChange0to1(leftDirectionalLight, rightDirectionalLight, zoomFactor)

            setTimeout(() => {
                sidebarCircleOne.classList.remove('current')
                sidebarCircleTwo.classList.add('current')
                sidebarCircleThree.classList.remove('current')
            }, 500)
        }
        else if (currentLink == 1) {
            isArrowClickAllowed = false
            phaseChange1to2(zoomFactor)

            setTimeout(() => {
                sidebarCircleOne.classList.remove('current')
                sidebarCircleTwo.classList.remove('current')
                sidebarCircleThree.classList.add('current')
               
            }, 500)
        }
    }
})

// instructionsText
let isRightFlipped = true

const instructionsText = document.getElementById('instructionsText')
const instructionsBar= document.getElementById('instructionsBar')

const instructionsTextArray = [
    '<t class="smallText">Tap objects twice to interact.</t>',
    '<t class="smallText">Orbit & Zoom to get a better look.</t>',
    '<t class="smallText">Scroll down slowly.</t>'
]

const changeInstructions = (index) => {
    instructionsText.innerHTML = instructionsTextArray[index]
}

const rightDiv = document.getElementById('rightDiv')
const rightArrow = document.getElementById('right')

let closedOnOne = false
let closedOnTwo = false
let closedOnThree = false

rightDiv.addEventListener('click', () => {
    if (isRightFlipped == true) {
        gsap.to(instructionsBar, {duration: 0.5, x:'-32.5rem'})

        rightArrow.classList.remove('flipped')
        isRightFlipped = false

        closeChecker(phase)
    }
    else if (isRightFlipped == false) {
        gsap.to(instructionsBar, {duration: 0.5, x:'0rem'})

        rightArrow.classList.add('flipped')
        isRightFlipped = true
    }
})

const rotationChecker = () => {
    if (isPRotated == true) {
        gsap.to(P.rotation, {duration: 1, delay: 0, y: P.rotation.y - Math.PI*90/180})
        isPRotated = false
    }
    if (isARotated == true) {
        gsap.to(A.rotation, {duration: 1, delay: 0, y: A.rotation.y - Math.PI*90/180})
        isARotated = false
    }
    if (isTRotated == true) {
        gsap.to(T.rotation, {duration: 1, delay: 0, y: T.rotation.y - Math.PI*90/180})
        isTRotated = false
    }
    if (isRRotated == true) {
        gsap.to(R.rotation, {duration: 1, delay: 0, y: R.rotation.y - Math.PI*90/180})
        isRRotated = false
    }
    if (isIRotated == true) {
        gsap.to(I.rotation, {duration: 1, delay: 0, y: I.rotation.y - Math.PI*90/180})
        isIRotated = false
    }
    if (isCRotated == true) {
        gsap.to(C.rotation, {duration: 1, delay: 0, y: C.rotation.y - Math.PI*90/180})
        isCRotated = false
    }
    if (isKRotated == true) {
        gsap.to(K.rotation, {duration: 1, delay: 0, y: K.rotation.y - Math.PI*90/180})
        isKRotated = false
    }
}

// Shooting Stars

const generateShootingStar = () => {
    const material = new THREE.LineBasicMaterial({
        color: 'white' })
    const points = []
    const pointA = new THREE.Vector3(Math.random()*50-25,Math.random()*50-25+camera.position.y,Math.random()*50-25)
    const pointB = new THREE.Vector3(Math.random()*50-25,Math.random()*50-25+camera.position.y,Math.random()*50-25)

    points.push(pointA)
    points.push(pointB)

    const geometry = new THREE.BufferGeometry().setFromPoints(points)

    const line = new THREE.Line(geometry, material)
    scene.add(line)

    const directionVector = new THREE.Vector3(pointA.x - pointB.x, pointA.y - pointB.y, pointA.z - pointB.z)
    console.log(directionVector)

    gsap.to(line.position, {duration: 3, x: directionVector.x*15, y: directionVector.y*15, z: directionVector.z*15})

    setTimeout(() => {
        scene.remove(line)
        generateShootingStar()
    }, 3000)
}

generateShootingStar()


// Phase Change Sequence
const phaseChange0to1 = (left, right, zf) => {
    isPhaseChanging = true
    clickCounter = 0

    phase = 1

    changeInstructions(phase)

    if (closedOnTwo == false) {
        setTimeout(() => {
            if (isRightFlipped == false) {
                gsap.to(instructionsBar, {duration: 0.5, x:'0rem'})
                rightArrow.classList.add('flipped')
                isRightFlipped = true
            }
        }, 1000)
    }
    
    cameraGroup.position.set(0,0,0)

    rotationChecker()

    controls.enabled = false

    scene.remove(left)
    scene.remove(right)
    scene.add(ambientLight)
    scene.add(pointLight)


    currentLink = 1

    scene.add(allObjects)

    gsap.to(camera.position, {duration: 2, delay: 0.5, x: 9*zf, y: 9, z: 9*zf})

    setTimeout(() => {
    
        scene.remove(nameGroup)
        scene.remove(leftNameWallPosition)
        scene.remove(rightNameWallPosition)
        controls.target.set(0,0,0)
        controls.enableRotate = true
        controls.enableZoom = true
        controls.enabled = true    
        controls.saveState()   

        isArrowClickAllowed = true

        isPhaseChanging = false

        if (isItEverOn == false) {
            turnLaptopOn.style.display = 'block'
            gsap.to(turnLaptopOn, {duration: 1, opacity: 1})
            isTextAtTheBottom = true
        }
    }, 2500)
}

// Phase Change Sequence
const phaseChange1to0 = (left, right, zf) => { 
    isPhaseChanging = true
    clickCounter = 0


    if (isTextAtTheBottom == true) {
        gsap.to(turnLaptopOn, {duration: 1, opacity: 0})
        setTimeout(() => {
            turnLaptopOn.style.display = 'none'
        }, 1000)
        isTextAtTheBottom = false
    }

    setTimeout(() => {

        // screenGroup.children[0].children[0].material.emissive.r = 0
        // screenGroup.children[0].children[0].material.emissive.g = 0
        // screenGroup.children[0].children[0].material.emissive.b = 0
        // scene.remove(rectAreaLight)

        scene.remove(offAmbientLight)
        scene.remove(offPointLight)
        
        scene.add(ambientLight)
        scene.add(pointLight)

        controls.reset()

        controls.enabled = false

        // Close Modal if there is a modal
        if (isModalOn) {
            const infoModalx = document.getElementById('infoModal')
            const contentGreyx = document.getElementById('contentGrey')
            const contentRedx = document.getElementById('contentRed')
            const stayx = document.getElementById('stay')
            const newCanvas = document.getElementById('newCanvas')

            // infoModalx.classList.remove('display')
            contentGreyx.classList.remove('displayGrey')
            contentRedx.classList.remove('displayRed')
            stayx.classList.remove('stay')
            newCanvas.classList.remove('canvasStay')


            // infoModalx.classList.add('displayx')
            contentGreyx.classList.add('displayGreyx')
            contentRedx.classList.add('displayRedx')
            stayx.classList.add('stayx')
            newCanvas.classList.add('canvasStayx')


            isModalOn = false

            setTimeout(() => {
                infoModalx.classList.add('displayx')
            }, 500)
        }

        isLaptopOn = false

        scene.add(nameGroup)
        scene.add(leftNameWallPosition)
        scene.add(rightNameWallPosition)

        // scene.remove(left)
        // scene.remove(right)
        leftDirectionalLight.intensity = 0
        rightDirectionalLight.intensity = 0
        scene.add(left)
        scene.add(right)
     
        currentLink = 0

        phase = 0

        changeInstructions(phase)

        if (closedOnOne == false) {
            setTimeout(() => {
                if (isRightFlipped == false) {
                    gsap.to(instructionsBar, {duration: 0.5, x:'0rem'})
                    rightArrow.classList.add('flipped')
                    isRightFlipped = true
                }
            }, 1000)
        }
        
        camera.lookAt(0,0,0)

        // console.log(zf)
        gsap.to(camera.position, {duration: 2, delay: 0.5, x: 5*zf, y: 35, z: 5*zf})
    
        setTimeout(() => {
       
            scene.remove(allObjects)
            
            controls.target.set(0,30,0)
            controls.enableRotate = false
            controls.enablePan = false
            controls.enableZoom = false
            controls.enabled = false
            controls.saveState()


            scene.remove(ambientLight)
            scene.remove(pointLight)

            lightUp()

            isArrowClickAllowed = true

            isPhaseChanging = false
        }, 2500)
    }, 200)
}

// Phase Change 1 to 2
const phaseChange1to2 = (zf) => {
    document.querySelectorAll('.displayBlockMe').forEach((a) => {
        a.classList.remove('displayBlockMe')
        a.classList.add('displayNoneMe')
        gsap.to(a, {duration: 0.5, opacity: 1})
    })

    activateScrollTrigger()

    document.querySelector('.scrollBlanks').style.zIndex = '10'

    phase = 2
    changeInstructions(phase)

    isPhaseChanging = true
    clickCounter = 0

    scene.remove(offAmbientLight)
    scene.remove(offPointLight)
    
    scene.add(ambientLight)
    scene.add(pointLight)

    if (closedOnThree == false) {
        setTimeout(() => {
            if (isRightFlipped == false) {
                gsap.to(instructionsBar, {duration: 0.5, x:'0rem'})
                rightArrow.classList.add('flipped')
                isRightFlipped = true
            }
        }, 1000)
    }

    if (isTextAtTheBottom == true) {
        gsap.to(turnLaptopOn, {duration: 1, opacity: 0})
        setTimeout(() => {
            turnLaptopOn.style.display = 'none'
        }, 1000)
        isTextAtTheBottom = false
    }

    setTimeout(() => {
        controls.reset()

        controls.enabled = false

        // Close Modal if there is a modal
        if (isModalOn) {
            const infoModalx = document.getElementById('infoModal')
            const contentGreyx = document.getElementById('contentGrey')
            const contentRedx = document.getElementById('contentRed')
            const stayx = document.getElementById('stay')
            const newCanvas = document.getElementById('newCanvas')

            // infoModalx.classList.remove('display')
            contentGreyx.classList.remove('displayGrey')
            contentRedx.classList.remove('displayRed')
            stayx.classList.remove('stay')
            newCanvas.classList.remove('canvasStay')


            // infoModalx.classList.add('displayx')
            contentGreyx.classList.add('displayGreyx')
            contentRedx.classList.add('displayRedx')
            stayx.classList.add('stayx')
            newCanvas.classList.add('canvasStayx')


            isModalOn = false

            setTimeout(() => {
                infoModalx.classList.add('displayx')
            }, 500)
        }

        isLaptopOn = false
     
        currentLink = 2

        camera.lookAt(0,0,0)

        // console.log(zf)
        gsap.to(camera.position, {duration: 2, delay: 0.5, x: 5*zf, y: -25, z: 5*zf})
    
        setTimeout(() => {
       
            scene.remove(allObjects)
            
            controls.target.set(0,-20,0)
            controls.enableRotate = false
            controls.enablePan = false
            controls.enableZoom = false
            controls.enabled = false
            controls.saveState()

            isArrowClickAllowed = true

            isPhaseChanging = false

            document.body.style.overflowY = 'scroll'
        }, 2500)
    }, 200)
}

const stayDiv = document.getElementById('stayDiv') 

// Phase Change 2 to 1
const phaseChange2to1 = (zf) => {
    document.querySelectorAll('.displayNoneMe').forEach((a) => {
        a.classList.remove('displayNoneMe')
        a.classList.add('displayBlockMe')
    })
    document.querySelector('.scrollBlanks').style.zIndex = '-10'

    document.body.style.overflowY = 'hidden'

    isPhaseChanging = true
    clickCounter = 0
    noClicks = true

    phase = 1

    changeInstructions(phase)

    if (closedOnTwo == false) {
        setTimeout(() => {
            if (isRightFlipped == false) {
                gsap.to(instructionsBar, {duration: 0.5, x:'0rem'})
                rightArrow.classList.add('flipped')
                isRightFlipped = true
            }
        }, 1000)
    }
    
    cameraGroup.position.set(0,0,0)

    setTimeout(() => {

        scene.add(allObjects)

        controls.enabled = false

        scene.add(ambientLight)
        scene.add(pointLight)

        currentLink = 1

        gsap.to(camera.position, {duration: 2, delay: 0.5, x: 9*zf, y: 9, z: 9*zf})
    
        setTimeout(() => {
            controls.target.set(0,0,0)
            controls.enableRotate = true
            // controls.enablePan = true
            controls.enableZoom = true
            controls.enabled = true    
            controls.saveState()   

            isArrowClickAllowed = true

            isPhaseChanging = false
            noClicks = false


            if (isItEverOn == false) {
                turnLaptopOn.style.display = 'block'
                gsap.to(turnLaptopOn, {duration: 1, opacity: 1})
                isTextAtTheBottom = true
            }
        }, 2500)
    }, 0)
}

// Close checker

const closeChecker = (index) => {
    if (index == 0) {
        closedOnOne = true
    }
    else if (index == 1) {
        closedOnTwo = true
    }
    else if (index == 2) {
        closedOnThree = true
    }
}

// Scroll Animations

gsap.registerPlugin(ScrollTrigger)

const activateScrollTrigger = () => {
    // hide side and instructions
    gsap.to('.sidebarMain', {
        scrollTrigger: {
            trigger: '.stayDiv',
            start: 'top bottom',
            end: '+=50%',
            // pin: true,
            scrub: true,
            markers: false
        },
        opacity: 0,
        // scale: 0.95,
        ease: 'none',
        
    })

    gsap.to('#instructionsBar', {
        scrollTrigger: {
            trigger: '.stayDiv',
            start: 'top bottom',
            end: '+=50%',
            // pin: true,
            scrub: true,
            markers: false
        },
        opacity: 0,
        // scale: 0.95,
        ease: 'none',
        
    })

    // Scroll anims
    gsap.to('#scrollTop1', {
        scrollTrigger: {
            trigger: '.stayDiv',
            start: 'center center',
            end: '+=400%',
            pin: true,
            scrub: true,
            markers: false
        },
        y: '-7.5rem',
        // scale: 0.95,
        ease: 'none',
        
    })
    
    gsap.to('#scrollTop2', {
        scrollTrigger: {
            trigger: '.stayDiv',
            start: 'center center',
            end: '+=400%',
            pin: true,
            scrub: true,
            markers: false
        },
        y: '-15rem',
        // scale: 0.9,
        ease: 'none',
        
    })
    
    gsap.to('#scrollTop3', {
        scrollTrigger: {
            trigger: '.stayDiv',
            start: 'center center',
            end: '+=400%',
            pin: true,
            scrub: true,
            markers: false
        },
        y: '-22.5rem',
        // scale: 0.85,
        ease: 'none',
        
    })
    
    gsap.to('#scrollTop4', {
        scrollTrigger: {
            trigger: '.stayDiv',
            start: 'center center',
            end: '+=400%',
            pin: true,
            scrub: true,
            markers: false
        },
        y: '-30rem',
        // scale: 0.8,
        ease: 'none',
        
    })
    
    gsap.to('#scrollBottom1', {
        scrollTrigger: {
            trigger: '.stayDiv',
            start: 'center center',
            end: '+=400%',
            pin: true,
            scrub: true,
            markers: false
        },
        y: '7.5rem',
        // scale: 0.95,
        ease: 'none',
        
    })
    
    gsap.to('#scrollBottom2', {
        scrollTrigger: {
            trigger: '.stayDiv',
            start: 'center center',
            end: '+=400%',
            pin: true,
            scrub: true,
            markers: false
        },
        y: '15rem',
        // scale: 0.9,
        ease: 'none',
        
    })
    
    gsap.to('#scrollBottom3', {
        scrollTrigger: {
            trigger: '.stayDiv',
            start: 'center center',
            end: '+=400%',
            pin: true,
            scrub: true,
            markers: false
        },
        y: '22.5rem',
        // scale: 0.85,
        ease: 'none',
        
    })
    
    gsap.to('#scrollBottom4', {
        scrollTrigger: {
            trigger: '.stayDiv',
            start: 'center center',
            end: '+=400%',
            pin: true,
            scrub: true,
            markers: false
        },
        y: '30rem',
        // scale: 0.8,
        ease: 'none',
        
    })

    gsap.to('.fromTheLeft', {
        scrollTrigger: {
            trigger: '.stayDiv',
            start: 'center center',
            end: '+=400%',
            pin: true,
            scrub: true,
            markers: false
        },
        x: '0%',
        // scale: 0.8,
        ease: 'none',
        
    })  

    gsap.to('.fromTheRight', {
        scrollTrigger: {
            trigger: '.stayDiv',
            start: 'center center',
            end: '+=400%',
            pin: true,
            scrub: true,
            markers: false
        },
        x: '-0.75%',
        // scale: 0.8,
        ease: 'none',
        
    }) 

    // Projects

    gsap.to('#mottoText', {
        scrollTrigger: {
            trigger: '.horizontalScrollDiv',
            start: 'top center',
            end: '+=50%',
            // pin: true,
            scrub: true,
            markers: false
        },
        opacity: '1',
        // scale: 0.8,
        ease: 'none',
    }) 

    gsap.to('.gum1', {
        scrollTrigger: {
            trigger: '.horizontalScrollDiv',
            start: '55% center',
            end: '+=2px',
            // pin: true,
            scrub: true,
            markers: false
        },
        opacity: '0',
        // scale: 0.8,
        ease: 'none',
    }) 

    gsap.to('.gum2', {
        scrollTrigger: {
            trigger: '.horizontalScrollDiv',
            start: '62.5% center',
            end: '+=2px',
            // pin: true,
            scrub: true,
            markers: false
        },
        opacity: '0',
        // scale: 0.8,
        ease: 'none',
    }) 

    gsap.to('.gum3', {
        scrollTrigger: {
            trigger: '.horizontalScrollDiv',
            start: '70% center',
            end: '+=2px',
            // pin: true,
            scrub: true,
            markers: false
        },
        opacity: '0',
        // scale: 0.8,
        ease: 'none',
    }) 

    gsap.to('.projectsTextDiv', {
        scrollTrigger: {
            trigger: '.horizontalScrollDiv',
            start: 'top top',
            end: '+=200%',
            pin: true,
            scrub: true,
            markers: false
        },
        y: '0',
        // scale: 0.8,
        ease: 'none',
    }) 

    gsap.to('.projectsContent', {
        scrollTrigger: {
            trigger: '.horizontalScrollDiv',
            start: 'top top',
            end: '+=200%',
            pin: true,
            scrub: true,
            markers: false,
            snap: 1/3
        },
        x: '-300vw',
        // scale: 0.8,
        ease: 'none',
    }) 

    gsap.to('.fadeInFirst', {
        scrollTrigger: {
            trigger: '.scrollEnd',
            start: 'top bottom',
            // markers: true,
        },
        delay: 2,
        duration: 2,
        opacity: 1,
        // scale: 0.8,
        ease: 'none',
    })
    
    gsap.to('.fadeInSecond', {
        scrollTrigger: {
            trigger: '.scrollEnd',
            start: 'top bottom',
            // markers: true,
        },
        delay: 3.5,
        duration: 2,
        opacity: 1,
        // scale: 0.8,
        ease: 'none',
    }) 
}

// cursor change
const sidebarMainCursor = document.querySelector('.sidebarMain')
const pointers = document.querySelectorAll('.pointers')
window.addEventListener('scroll', () => {
    if (phase == 2) {
        if (sidebarMainCursor.style.opacity < 0.9) {
            pointers.forEach((p) => {
                p.style.cursor = 'default'
            })
        }
        else {
            pointers.forEach((p) => {
                p.style.cursor = 'pointer'
            })
        }
    }
})

document.querySelector('#tryStart').innerText = '< >'
document.querySelector('#tryEnd').innerText = '</>'