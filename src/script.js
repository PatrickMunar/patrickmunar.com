import './style.css'
// import * as dat from 'lil-gui'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
// import { sRGBEncoding } from 'three'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'
import gsap from 'gsap'
import { BoxBufferGeometry, Vector2, Vector3 } from 'three'
import all from 'gsap/all'

let arrayIndex = 0
let isModalOn = false
let prevIndex = 0

// Colors

const directionalLightColors = [
    ['0xff0000', '0xffffff', '#ff0000', '#ffffff'],
    // ['0xF95700', '0x00A4CC', '#F95700', '#00A4CC'],
    ['0xD6ED17', '0x606060', '#D6ED17', '#606060'],
    ['0xff2B33', '0xD05A7F', '#ff2B33', '#D05A7F'],
    ['0xF95700', '0x00539C', '#F95700', '#00539C'],
    // ['0x5BfE51', '0xEA738D', '#5BfE51', '#EA738D'],
    // ['0x2C88ff', '0xff321E', '#2C88ff', '#ff321E']
]

let currentColor = 0

// Phase of the website
let phase = 0

// h1, h3
const textArray = [
    ['Hello',
    '...',
    "..."],
    ['',
    '...',
    "..."],
    ['Flag \n Football',
    '...',
    '...'],
    ['Hobbies & Interests',
    '...',
    '...'],
    ['Education',
    '...',
    '...'],
    ["What's \n Playin'",
    '...',
    '...']
]


// Inserts Appropriate Topic info
const insertModal = (index) => {
    console.log('index: ', index)
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
    
        h1Grey.innerText = textArray[index][0]
        h1Red.innerText = textArray[index][0]
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
        // // cameraGroup.position.z += ( - parallaxX - cameraGroup.position.z ) * 2 * parallaxTIme

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

// Scene
const scene = new THREE.Scene()
scene.background = new THREE.Color(0x000000)


/**
 * Loaders
 */
// Loading Manager
const loadingManager = new THREE.LoadingManager(
    // Loaded
    () => {
        console.log('loaded')
    },
    // Progress
    () => {
        console.log('progress')
    }
)

// Texture loader
const textureLoader = new THREE.TextureLoader()

// const offLaptopTexture = textureLoader.load(
//     'OffLaptop.jpg'
// )

// const offLaptopMaterial = new THREE.MeshStandardMaterial({
//     map: offLaptopTexture
// })

// const whiteMaterial = new THREE.MeshStandardMaterial({
//     color: 'white'
// })

// Draco loader
const dracoLoader = new DRACOLoader()
dracoLoader.setDecoderPath('draco/')

// GLTF loader
const gltfLoader = new GLTFLoader(loadingManager)
gltfLoader.setDRACOLoader(dracoLoader)

// Font Loader
const fontLoader = new FontLoader()


// // Texture
// const bakedTexture = textureLoader.load(
//     'baked.jpg'
// )
// bakedTexture.flipY = false
// bakedTexture.encoding = THREE.sRGBEncoding

// // Material
// const bakedMaterial = new THREE.MeshBasicMaterial({
//     map: bakedTexture
// })

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


allObjects.position.set (0,-2,0)
// allObjects.rotation.y = - Math.PI*90/180


// Group Repositions for Phase 1
DBGroup.position.set(-2.25,2.65,-2)
DBGroup.rotation.y = Math.PI*45/180

// GLTF Loader for Phase 0

gltfLoader.load(
    'LeftNameWall.glb',
    (obj) => {
        // room.scene.traverse((child) => {
        //     child.material = bakedMaterial
        // })
        scene.add(obj.scene)
        obj.scene.scale.set(0.025,0.025,0.025)
        // room.scene.position.y = -1
        // room.scene.rotation.y = Math.PI * 0.25
        // floor.scene.position.x = -1.5
        // room.scene.position.z = 1.5
        // room.scene.position.set(-1,0,5)
        // room.scene.rotation.y = Math.PI * 0.25

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
        // room.scene.traverse((child) => {
        //     child.material = bakedMaterial
        // })
        scene.add(obj.scene)
        obj.scene.scale.set(0.025,0.025,0.025)
        // room.scene.position.y = -1
        // room.scene.rotation.y = Math.PI * 0.25
        // floor.scene.position.x = -1.5
        // room.scene.position.z = 1.5
        // room.scene.position.set(-1,0,5)
        // room.scene.rotation.y = Math.PI * 0.25

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
        // room.scene.traverse((child) => {
        //     child.material = bakedMaterial
        // })
        scene.add(obj.scene)
        obj.scene.scale.set(0.025,0.025,0.025)
        // room.scene.position.y = -1
        // room.scene.rotation.y = Math.PI * 0.25
        // floor.scene.position.x = -1.5
        // room.scene.position.z = 1.5
        // room.scene.position.set(-1,0,5)
        // room.scene.rotation.y = Math.PI * 0.25

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
        // room.scene.traverse((child) => {
        //     child.material = bakedMaterial
        // })
        scene.add(obj.scene)
        obj.scene.scale.set(0.025,0.025,0.025)

        // room.scene.position.y = -1
        // room.scene.rotation.y = Math.PI * 0.25
        // floor.scene.position.x = -1.5
        // room.scene.position.z = 1.5
        // room.scene.position.set(-1,0,5)
        // room.scene.rotation.y = Math.PI * 0.25

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
        // room.scene.traverse((child) => {
        //     child.material = bakedMaterial
        // })
        scene.add(obj.scene)
        obj.scene.scale.set(0.025,0.025,0.025)

        // room.scene.position.y = -1
        // room.scene.rotation.y = Math.PI * 0.25
        // floor.scene.position.x = -1.5
        // room.scene.position.z = 1.5
        // room.scene.position.set(-1,0,5)
        // room.scene.rotation.y = Math.PI * 0.25

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
        // room.scene.traverse((child) => {
        //     child.material = bakedMaterial
        // })
        scene.add(obj.scene)
        obj.scene.scale.set(0.025,0.025,0.025)

        // room.scene.position.y = -1
        // room.scene.rotation.y = Math.PI * 0.25
        // floor.scene.position.x = -1.5
        // room.scene.position.z = 1.5
        // room.scene.position.set(-1,0,5)
        // room.scene.rotation.y = Math.PI * 0.25

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
        // room.scene.traverse((child) => {
        //     child.material = bakedMaterial
        // })
        scene.add(obj.scene)
        obj.scene.scale.set(0.025,0.025,0.025)

        // room.scene.position.y = -1
        // room.scene.rotation.y = Math.PI * 0.25
        // floor.scene.position.x = -1.5
        // room.scene.position.z = 1.5
        // room.scene.position.set(-1,0,5)
        // room.scene.rotation.y = Math.PI * 0.25

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
        // room.scene.traverse((child) => {
        //     child.material = bakedMaterial
        // })
        scene.add(obj.scene)
        obj.scene.scale.set(0.025,0.025,0.025)

        // room.scene.position.y = -1
        // room.scene.rotation.y = Math.PI * 0.25
        // floor.scene.position.x = -1.5
        // room.scene.position.z = 1.5
        // room.scene.position.set(-1,0,5)
        // room.scene.rotation.y = Math.PI * 0.25

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
        // room.scene.traverse((child) => {
        //     child.material = bakedMaterial
        // })
        scene.add(obj.scene)
        obj.scene.scale.set(0.025,0.025,0.025)

        // room.scene.position.y = -1
        // room.scene.rotation.y = Math.PI * 0.25
        // floor.scene.position.x = -1.5
        // room.scene.position.z = 1.5
        // room.scene.position.set(-1,0,5)
        // room.scene.rotation.y = Math.PI * 0.25

        // console.log(obj)
        K.add(obj.scene)
        // obj.scene.castShadow = true
        obj.scene.children[0].castShadow = true
        // obj.scene.children[0].receiveShadow = true
    }
)




// GLTF Loader for Phase 1
gltfLoader.load(
    'DBSphere.glb',
    (obj) => {
        // room.scene.traverse((child) => {
        //     child.material = bakedMaterial
        // })
        scene.add(obj.scene)
        obj.scene.scale.set(0.05,0.05,0.05)
        // room.scene.position.y = -1
        // room.scene.rotation.y = Math.PI * 0.25
        // floor.scene.position.x = -1.5
        // room.scene.position.z = 1.5
        // room.scene.position.set(-1,0,5)
        // room.scene.rotation.y = Math.PI * 0.25

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
        // room.scene.traverse((child) => {
        //     child.material = bakedMaterial
        // })
        scene.add(obj.scene)
        obj.scene.scale.set(0.05,0.05,0.05)
        // room.scene.position.y = -1
        // room.scene.rotation.y = Math.PI * 0.25
        // floor.scene.position.x = -1.5
        // room.scene.position.z = 1.5
        // room.scene.position.set(-1,0,5)
        // room.scene.rotation.y = Math.PI * 0.25

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
        // room.scene.traverse((child) => {
        //     child.material = bakedMaterial
        // })
        scene.add(obj.scene)
        obj.scene.scale.set(0.05,0.05,0.05)
        // room.scene.position.y = -1
        // room.scene.rotation.y = Math.PI * 0.25
        // floor.scene.position.x = -1.5
        // room.scene.position.z = 1.5
        // room.scene.position.set(-1,0,5)
        // room.scene.rotation.y = Math.PI * 0.25

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
        // room.scene.traverse((child) => {
        //     child.material = bakedMaterial
        // })
        scene.add(obj.scene)
        obj.scene.scale.set(0.05,0.05,0.05)
        // room.scene.position.y = -1
        // room.scene.rotation.y = Math.PI * 0.25
        // floor.scene.position.x = -1.5
        // room.scene.position.z = 1.5
        // room.scene.position.set(-1,0,5)
        // room.scene.rotation.y = Math.PI * 0.25

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
        // room.scene.traverse((child) => {
        //     child.material = bakedMaterial
        // })
        scene.add(obj.scene)
        obj.scene.scale.set(0.05,0.05,0.05)
        // room.scene.position.y = -1
        // room.scene.rotation.y = Math.PI * 0.25
        // floor.scene.position.x = -1.5
        // room.scene.position.z = 1.5
        // room.scene.position.set(-1,0,5)
        // room.scene.rotation.y = Math.PI * 0.25

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
        // room.scene.traverse((child) => {
        //     child.material = bakedMaterial
        // })
        scene.add(obj.scene)
        obj.scene.scale.set(0.05,0.05,0.05)
        // room.scene.position.y = -1
        // room.scene.rotation.y = Math.PI * 0.25
        // floor.scene.position.x = -1.5
        // room.scene.position.z = 1.5
        // room.scene.position.set(-1,0,5)
        // room.scene.rotation.y = Math.PI * 0.25

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
        // room.scene.traverse((child) => {
        //     child.material = bakedMaterial
        // })
        scene.add(obj.scene)
        obj.scene.scale.set(0.05,0.05,0.05)
        // room.scene.position.y = -1
        // room.scene.rotation.y = Math.PI * 0.25
        // floor.scene.position.x = -1.5
        // room.scene.position.z = 1.5
        // room.scene.position.set(-1,0,5)
        // room.scene.rotation.y = Math.PI * 0.25

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
        // room.scene.traverse((child) => {
        //     child.material = bakedMaterial
        // })
        scene.add(obj.scene)
        obj.scene.scale.set(0.05,0.05,0.05)
        // room.scene.position.y = -1
        // room.scene.rotation.y = Math.PI * 0.25
        // floor.scene.position.x = -1.5
        // room.scene.position.z = 1.5
        // room.scene.position.set(-1,0,5)
        // room.scene.rotation.y = Math.PI * 0.25

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
        // room.scene.traverse((child) => {
        //     child.material = bakedMaterial
        // })
        scene.add(obj.scene)
        obj.scene.scale.set(0.05,0.05,0.05)
        // room.scene.position.y = -1
        // room.scene.rotation.y = Math.PI * 0.25
        // floor.scene.position.x = -1.5
        // room.scene.position.z = 1.5
        // room.scene.position.set(-1,0,5)
        // room.scene.rotation.y = Math.PI * 0.25

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
        // room.scene.traverse((child) => {
        //     child.material = bakedMaterial
        // })
        scene.add(obj.scene)
        obj.scene.scale.set(0.05,0.05,0.05)
        // room.scene.position.y = -1
        // room.scene.rotation.y = Math.PI * 0.25
        // floor.scene.position.x = -1.5
        // room.scene.position.z = 1.5
        // room.scene.position.set(-1,0,5)
        // room.scene.rotation.y = Math.PI * 0.25

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
        // room.scene.traverse((child) => {
        //     child.material = bakedMaterial
        // })
        scene.add(obj.scene)
        obj.scene.scale.set(0.05,0.05,0.05)
        // room.scene.position.y = -1
        // room.scene.rotation.y = Math.PI * 0.25
        // floor.scene.position.x = -1.5
        // room.scene.position.z = 1.5
        // room.scene.position.set(-1,0,5)
        // room.scene.rotation.y = Math.PI * 0.25

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
        // room.scene.traverse((child) => {
        //     child.material = bakedMaterial
        // })
        scene.add(obj.scene)
        obj.scene.scale.set(0.05,0.05,0.05)
        // room.scene.position.y = -1
        // room.scene.rotation.y = Math.PI * 0.25
        // floor.scene.position.x = -1.5
        // room.scene.position.z = 1.5
        // room.scene.position.set(-1,0,5)
        // room.scene.rotation.y = Math.PI * 0.25

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
        // room.scene.traverse((child) => {
        //     child.material = bakedMaterial
        // })
        scene.add(obj.scene)
        obj.scene.scale.set(0.05,0.05,0.05)
        // room.scene.position.y = -1
        // room.scene.rotation.y = Math.PI * 0.25
        // floor.scene.position.x = -1.5
        // room.scene.position.z = 1.5
        // room.scene.position.set(-1,0,5)
        // room.scene.rotation.y = Math.PI * 0.25

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
        // room.scene.traverse((child) => {
        //     child.material = bakedMaterial
        // })
        scene.add(obj.scene)
        obj.scene.scale.set(0.05,0.05,0.05)
        // room.scene.position.y = -1
        // room.scene.rotation.y = Math.PI * 0.25
        // floor.scene.position.x = -1.5
        // room.scene.position.z = 1.5
        // room.scene.position.set(-1,0,5)
        // room.scene.rotation.y = Math.PI * 0.25

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
        // room.scene.traverse((child) => {
        //     child.material = bakedMaterial
        // })
        scene.add(obj.scene)
        obj.scene.scale.set(0.05,0.05,0.05)
        // room.scene.position.y = -1
        // room.scene.rotation.y = Math.PI * 0.25
        // floor.scene.position.x = -1.5
        // room.scene.position.z = 1.5
        // room.scene.position.set(-1,0,5)
        // room.scene.rotation.y = Math.PI * 0.25

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
        // room.scene.traverse((child) => {
        //     child.material = bakedMaterial
        // })
        scene.add(obj.scene)
        obj.scene.scale.set(0.05,0.05,0.05)
        // room.scene.position.y = -1
        // room.scene.rotation.y = Math.PI * 0.25
        // floor.scene.position.x = -1.5
        // room.scene.position.z = 1.5
        // room.scene.position.set(-1,0,5)
        // room.scene.rotation.y = Math.PI * 0.25

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
        // room.scene.traverse((child) => {
        //     child.material = bakedMaterial
        // })
        scene.add(obj.scene)
        obj.scene.scale.set(0.05,0.05,0.05)
        // room.scene.position.y = -1
        // room.scene.rotation.y = Math.PI * 0.25
        // floor.scene.position.x = -1.5
        // room.scene.position.z = 1.5
        // room.scene.position.set(-1,0,5)
        // room.scene.rotation.y = Math.PI * 0.25

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
        // room.scene.traverse((child) => {
        //     child.material = bakedMaterial
        // })
        scene.add(obj.scene)
        obj.scene.scale.set(0.05,0.05,0.05)
        // room.scene.position.y = -1
        // room.scene.rotation.y = Math.PI * 0.25
        // floor.scene.position.x = -1.5
        // room.scene.position.z = 1.5
        // room.scene.position.set(-1,0,5)
        // room.scene.rotation.y = Math.PI * 0.25

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
        // room.scene.traverse((child) => {
        //     child.material = bakedMaterial
        // })
        scene.add(obj.scene)
        obj.scene.scale.set(0.05,0.05,0.05)
        // room.scene.position.y = -1
        // room.scene.rotation.y = Math.PI * 0.25
        // floor.scene.position.x = -1.5
        // room.scene.position.z = 1.5
        // room.scene.position.set(-1,0,5)
        // room.scene.rotation.y = Math.PI * 0.25

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
        // room.scene.traverse((child) => {
        //     child.material = bakedMaterial
        // })
        scene.add(obj.scene)
        obj.scene.scale.set(0.05,0.05,0.05)
        // room.scene.position.y = -1
        // room.scene.rotation.y = Math.PI * 0.25
        // floor.scene.position.x = -1.5
        // room.scene.position.z = 1.5
        // room.scene.position.set(-1,0,5)
        // room.scene.rotation.y = Math.PI * 0.25

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
        // room.scene.traverse((child) => {
        //     child.material = bakedMaterial
        // })
        scene.add(obj.scene)
        obj.scene.scale.set(0.05,0.05,0.05)
        // room.scene.position.y = -1
        // room.scene.rotation.y = Math.PI * 0.25
        // floor.scene.position.x = -1.5
        // room.scene.position.z = 1.5
        // room.scene.position.set(-1,0,5)
        // room.scene.rotation.y = Math.PI * 0.25

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
        // room.scene.traverse((child) => {
        //     child.material = bakedMaterial
        // })
        scene.add(obj.scene)
        obj.scene.scale.set(0.05,0.05,0.05)
        // room.scene.position.y = -1
        // room.scene.rotation.y = Math.PI * 0.25
        // floor.scene.position.x = -1.5
        // room.scene.position.z = 1.5
        // room.scene.position.set(-1,0,5)
        // room.scene.rotation.y = Math.PI * 0.25

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
        // room.scene.traverse((child) => {
        //     child.material = bakedMaterial
        // })
        scene.add(obj.scene)
        obj.scene.scale.set(0.05,0.05,0.05)
        // room.scene.position.y = -1
        // room.scene.rotation.y = Math.PI * 0.25
        // floor.scene.position.x = -1.5
        // room.scene.position.z = 1.5
        // room.scene.position.set(-1,0,5)
        // room.scene.rotation.y = Math.PI * 0.25

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
        // room.scene.traverse((child) => {
        //     child.material = bakedMaterial
        // })
        scene.add(obj.scene)
        obj.scene.scale.set(0.05,0.05,0.05)
        // room.scene.position.y = -1
        // room.scene.rotation.y = Math.PI * 0.25
        // floor.scene.position.x = -1.5
        // room.scene.position.z = 1.5
        // room.scene.position.set(-1,0,5)
        // room.scene.rotation.y = Math.PI * 0.25

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
        // room.scene.traverse((child) => {
        //     child.material = bakedMaterial
        // })
        scene.add(obj.scene)
        obj.scene.scale.set(0.05,0.05,0.05)
        // room.scene.position.y = -1
        // room.scene.rotation.y = Math.PI * 0.25
        // floor.scene.position.x = -1.5
        // room.scene.position.z = 1.5
        // room.scene.position.set(-1,0,5)
        // room.scene.rotation.y = Math.PI * 0.25

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
        // room.scene.traverse((child) => {
        //     child.material = bakedMaterial
        // })
        // obj.scene.traverse((child) => {
        //     child.material = offLaptopMaterial
        // })

        scene.add(obj.scene)
        obj.scene.scale.set(0.05,0.05,0.05)
        // room.scene.position.y = -1
        // room.scene.rotation.y = Math.PI * 0.25
        // floor.scene.position.x = -1.5
        // room.scene.position.z = 1.5
        // room.scene.position.set(-1,0,5)
        // room.scene.rotation.y = Math.PI * 0.25
        

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
        // room.scene.traverse((child) => {
        //     child.material = bakedMaterial
        // })
        scene.add(obj.scene)
        obj.scene.scale.set(0.05,0.05,0.05)
        // room.scene.position.y = -1
        // room.scene.rotation.y = Math.PI * 0.25
        // floor.scene.position.x = -1.5
        // room.scene.position.z = 1.5
        // room.scene.position.set(-1,0,5)
        // room.scene.rotation.y = Math.PI * 0.25

        // console.log(obj)
        wallsandfloor.add(obj.scene)
        // obj.scene.castShadow = true
        obj.scene.children[0].receiveShadow = true
    }
)


gltfLoader.load(
    'WhiteMats.glb',
    (obj) => {
        // room.scene.traverse((child) => {
        //     child.material = bakedMaterial
        // })
        scene.add(obj.scene)
        obj.scene.scale.set(0.05,0.05,0.05)
        // room.scene.position.y = -1
        // room.scene.rotation.y = Math.PI * 0.25
        // floor.scene.position.x = -1.5
        // room.scene.position.z = 1.5
        // room.scene.position.set(-1,0,5)
        // room.scene.rotation.y = Math.PI * 0.25

        // console.log(obj)
        staticStairsGroup.add(obj.scene)
        obj.scene.children[0].castShadow = true
        obj.scene.children[0].receiveShadow = true
    }
)

gltfLoader.load(
    'WhiteDrawerTop.glb',
    (obj) => {
        // room.scene.traverse((child) => {
        //     child.material = bakedMaterial
        // })
        scene.add(obj.scene)
        obj.scene.scale.set(0.05,0.05,0.05)
        // room.scene.position.y = -1
        // room.scene.rotation.y = Math.PI * 0.25
        // floor.scene.position.x = -1.5
        // room.scene.position.z = 1.5
        // room.scene.position.set(-1,0,5)
        // room.scene.rotation.y = Math.PI * 0.25

        // console.log(obj)
        topDrawer.add(obj.scene)
        obj.scene.children[0].castShadow = true
        obj.scene.children[0].receiveShadow = true
    }
)

gltfLoader.load(
    'WhiteDrawerMiddle.glb',
    (obj) => {
        // room.scene.traverse((child) => {
        //     child.material = bakedMaterial
        // })
        scene.add(obj.scene)
        obj.scene.scale.set(0.05,0.05,0.05)
        // room.scene.position.y = -1
        // room.scene.rotation.y = Math.PI * 0.25
        // floor.scene.position.x = -1.5
        // room.scene.position.z = 1.5
        // room.scene.position.set(-1,0,5)
        // room.scene.rotation.y = Math.PI * 0.25

        // console.log(obj)
        midDrawer.add(obj.scene)
        obj.scene.children[0].castShadow = true
        obj.scene.children[0].receiveShadow = true
    }
)

gltfLoader.load(
    'WhiteDrawerBottom.glb',
    (obj) => {
        // room.scene.traverse((child) => {
        //     child.material = bakedMaterial
        // })
        scene.add(obj.scene)
        obj.scene.scale.set(0.05,0.05,0.05)
        // room.scene.position.y = -1
        // room.scene.rotation.y = Math.PI * 0.25
        // floor.scene.position.x = -1.5
        // room.scene.position.z = 1.5
        // room.scene.position.set(-1,0,5)
        // room.scene.rotation.y = Math.PI * 0.25

        // console.log(obj)
        botDrawer.add(obj.scene)
        obj.scene.children[0].castShadow = true
        obj.scene.children[0].receiveShadow = true
    }
)

gltfLoader.load(
    'TopWhiteBedframe.glb',
    (obj) => {
        // room.scene.traverse((child) => {
        //     child.material = bakedMaterial
        // })
        scene.add(obj.scene)
        obj.scene.scale.set(0.05,0.05,0.05)
        // room.scene.position.y = -1
        // room.scene.rotation.y = Math.PI * 0.25
        // floor.scene.position.x = -1.5
        // room.scene.position.z = 1.5
        // room.scene.position.set(-1,0,5)
        // room.scene.rotation.y = Math.PI * 0.25

        // console.log(obj)
        topBedframeGroup.add(obj.scene)
        obj.scene.children[0].castShadow = true
        obj.scene.children[0].receiveShadow = true

    }
)

gltfLoader.load(
    'TopBlackBedframe.glb',
    (obj) => {
        // room.scene.traverse((child) => {
        //     child.material = bakedMaterial
        // })
        scene.add(obj.scene)
        obj.scene.scale.set(0.05,0.05,0.05)
        // room.scene.position.y = -1
        // room.scene.rotation.y = Math.PI * 0.25
        // floor.scene.position.x = -1.5
        // room.scene.position.z = 1.5
        // room.scene.position.set(-1,0,5)
        // room.scene.rotation.y = Math.PI * 0.25

        // console.log(obj)
        topBedframeGroup.add(obj.scene)
        obj.scene.children[0].castShadow = true
        obj.scene.children[0].receiveShadow = true

    }
)

gltfLoader.load(
    'RedWalls.glb',
    (obj) => {
        // room.scene.traverse((child) => {
        //     child.material = bakedMaterial
        // })
        scene.add(obj.scene)
        obj.scene.scale.set(0.05,0.05,0.05)
        // room.scene.position.y = -1
        // room.scene.rotation.y = Math.PI * 0.25
        // floor.scene.position.x = -1.5
        // room.scene.position.z = 1.5
        // room.scene.position.set(-1,0,5)
        // room.scene.rotation.y = Math.PI * 0.25

        // console.log(obj)
        wallsandfloor.add(obj.scene)
        obj.scene.castShadow = true
        obj.scene.children[0].receiveShadow = true
    }
)

gltfLoader.load(
    'Pillow.glb',
    (obj) => {
        // room.scene.traverse((child) => {
        //     child.material = bakedMaterial
        // })
        scene.add(obj.scene)
        obj.scene.scale.set(0.05,0.05,0.05)
        // room.scene.position.y = -1
        // room.scene.rotation.y = Math.PI * 0.25
        // floor.scene.position.x = -1.5
        // room.scene.position.z = 1.5
        // room.scene.position.set(-1,0,5)
        // room.scene.rotation.y = Math.PI * 0.25

        // console.log(obj)
        topBedframeGroup.add(obj.scene)
        obj.scene.children[0].castShadow = true
        obj.scene.children[0].receiveShadow = true
    }
)

gltfLoader.load(
    'BottomWhiteBedframe.glb',
    (obj) => {
        // room.scene.traverse((child) => {
        //     child.material = bakedMaterial
        // })
        scene.add(obj.scene)
        obj.scene.scale.set(0.05,0.05,0.05)
        // room.scene.position.y = -1
        // room.scene.rotation.y = Math.PI * 0.25
        // floor.scene.position.x = -1.5
        // room.scene.position.z = 1.5
        // room.scene.position.set(-1,0,5)
        // room.scene.rotation.y = Math.PI * 0.25

        // console.log(obj)
        bottomBedframeGroup.add(obj.scene)
        obj.scene.children[0].castShadow = true
        obj.scene.children[0].receiveShadow = true
    }
)

gltfLoader.load(
    'BottomBlackBedframe.glb',
    (obj) => {
        // room.scene.traverse((child) => {
        //     child.material = bakedMaterial
        // })
        scene.add(obj.scene)
        obj.scene.scale.set(0.05,0.05,0.05)
        // room.scene.position.y = -1
        // room.scene.rotation.y = Math.PI * 0.25
        // floor.scene.position.x = -1.5
        // room.scene.position.z = 1.5
        // room.scene.position.set(-1,0,5)
        // room.scene.rotation.y = Math.PI * 0.25

        // console.log(obj)
        bottomBedframeGroup.add(obj.scene)
        obj.scene.children[0].castShadow = true
        obj.scene.children[0].receiveShadow = true

    }
)

gltfLoader.load(
    'BlackStairs.glb',
    (obj) => {
        // room.scene.traverse((child) => {
        //     child.material = bakedMaterial
        // })
        scene.add(obj.scene)
        obj.scene.scale.set(0.05,0.05,0.05)
        // room.scene.position.y = -1
        // room.scene.rotation.y = Math.PI * 0.25
        // floor.scene.position.x = -1.5
        // room.scene.position.z = 1.5
        // room.scene.position.set(-1,0,5)
        // room.scene.rotation.y = Math.PI * 0.25

        // console.log(obj)
        staticStairsGroup.add(obj.scene)
        obj.scene.children[0].castShadow = true
        obj.scene.children[0].receiveShadow = true
    }
)


gltfLoader.load(
    'Bed.glb',
    (obj) => {
        // room.scene.traverse((child) => {
        //     child.material = bakedMaterial
        // })
        scene.add(obj.scene)
        obj.scene.scale.set(0.05,0.05,0.05)
        // room.scene.position.y = -1
        // room.scene.rotation.y = Math.PI * 0.25
        // floor.scene.position.x = -1.5
        // room.scene.position.z = 1.5
        // room.scene.position.set(-1,0,5)
        // room.scene.rotation.y = Math.PI * 0.25

        // console.log(obj)
        topBedframeGroup.add(obj.scene)
        obj.scene.children[0].castShadow = true
        obj.scene.children[0].receiveShadow = true


    }
)


/**
 * Galaxy
 */



 const parameters = {
    count: 50000,
    size: 0.05,
    spread: 3,
    radius: 20,
    branches: 3,
    spin: 1,
    randomness: 0.2,
    rpower: 3,
    insideColor: '#ff0000',
    outsideColor: '#0000ff'
}

let geometry = null
let material = null
let points = null
let galaxy = new THREE.Group()

const generateGalaxy = () => {
    // Destroy
    if ( points !== null) {
        geometry.dispose()
        material.dispose()
        scene.remove(points)
    }


    geometry = new THREE.BufferGeometry()
    const positions = new Float32Array(parameters.count*3)
    const colors = new Float32Array(parameters.count*3)

    const colorInside = new THREE.Color(parameters.insideColor)
    const colorOutside = new THREE.Color(parameters.outsideColor)



    for (let i=0; i<parameters.count; i++) {
        const i3 = i*3

        // Position
        const radius = Math.random()*parameters.radius
        const spinAngle = radius * parameters.spin
        const branchAngle = ( i % parameters.branches ) / parameters.branches * Math.PI * 2

        // randomness
        const randomX = Math.pow(Math.random(), parameters.rpower) * (Math.random() < 0.5 ? 1 : -1)
        const randomY = Math.pow(Math.random(), parameters.rpower) * (Math.random() < 0.5 ? 1 : -1)
        const randomZ = Math.pow(Math.random(), parameters.rpower) * (Math.random() < 0.5 ? 1 : -1)

        positions[i3+0] = Math.cos(branchAngle + spinAngle) * radius + randomX
        positions[i3+1] = 0 + randomY
        positions[i3+2] = Math.sin(branchAngle + spinAngle) * radius + randomZ

        // Color
        const mixedColor = colorInside.clone()
        mixedColor.lerp(colorOutside, radius / parameters.radius)

        colors[i3+0] = mixedColor.r
        colors[i3+1] = mixedColor.g
        colors[i3+2] = mixedColor.b

    }

    geometry.setAttribute(
        'position',
        new THREE.BufferAttribute(positions, 3)
    )

    geometry.setAttribute(
        'color',
        new THREE.BufferAttribute(colors, 3)
    )
    
    // Material
    material = new THREE.PointsMaterial({
    size: parameters.size,
    sizeAttenuation: true,
    // depthWrite: false,
    blending: THREE.AdditiveBlending,
    vertexColors: true
    // color: '#ff5588'
    })

    // Points
    points = new THREE.Points(geometry, material)
    galaxy.add(points)
}

generateGalaxy()


galaxy.position.y = -1.10


// Lighting
// const ambientLight = new THREE.AmbientLight(0xaa00ff, 0.1)
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
// pointLight.shadow.radius = 5

offPointLight.position.set(0,12,12)
offPointLight.castShadow = true
offPointLight.shadow.mapSize.x = 1024*4
offPointLight.shadow.mapSize.y = 1024*4
offPointLight.shadow.camera.near = 5
offPointLight.shadow.camera.far = 30
offPointLight.shadow.normalBias = 0.05
// offPointLight.shadow.radius = 5

// scene.add(pointLight)

const rectAreaLight = new THREE.RectAreaLight(0x2222ff, 2000, 0.15, 0.1)
rectAreaLight.position.set(-1.25,0,-1.75)
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

if(window.innerHeight > window.innerWidth){
    if (window.innerWidth <= 320) {
        zoomFactor = 5
    }
    else if (window.innerWidth > 320 && window.innerWidth <= 375) {
        zoomFactor = 4.5
    }
    else if (window.innerWidth > 375 && window.innerWidth <= 425) {
        zoomFactor = 4
    }
    else if (window.innerWidth > 425 && window.innerWidth <= 750) {
        zoomFactor = 3
    }
    else if (window.innerWidth > 750 && window.innerWidth <= 950) {
        zoomFactor = 2.5
    }
    else {
        zoomFactor = 1
    }
}

window.addEventListener('resize', () =>
{
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

//  window.addEventListener('click', () => {
//     clickCounter += 1
//     console.log(clickCounter)
//     if (currentIntersect) {
//         console.log('click')
//             if (currentIntersect.object == laptopGroup.children[0].children[0] || currentIntersect.object == laptopGroup.children[1].children[0] || currentIntersect.object == screenGroup.children[0].children[0]) {
//                 if (clickCounter%2 == 0) {
//                     if (isLaptopOn == false) {
//                         lightLaptop()

//                         setTimeout(() => {
//                             arrayIndex = 0
//                             insertModal(arrayIndex)
//                         }, 1000)
//                     }
//                     else if (isLaptopOn == true && isAnimationDone == true) {
//                         arrayIndex = 1
//                         insertModal(arrayIndex)
//                     }
//                 }
//                 currentIntersect = null
//             }
//         if (isLaptopOn == true) {
//             if (currentIntersect.object == topBedframeGroup.children[0].children[0] || currentIntersect.object == topBedframeGroup.children[1].children[0] || currentIntersect.object == topBedframeGroup.children[2].children[0] || currentIntersect.object == topBedframeGroup.children[3].children[0]) {
//                 if (clickCounter%2 == 0) {
//                     hoverTopBedframeGroup()
//                 }
//                 currentIntersect = null
//             }
//             else if (currentIntersect.object == topDrawer.children[0].children[0]) {
//                 if (clickCounter%2 == 0) {
//                     topDrawerOut()
//                 }
//                 currentIntersect = null
//             }
//             else if (currentIntersect.object == midDrawer.children[0].children[0]) {
//                 if (clickCounter%2 == 0) {
//                     midDrawerOut()
//                 }
//                 currentIntersect = null
//             }
//             else if (currentIntersect.object == botDrawer.children[0].children[0]) {
//                 if (clickCounter%2 == 0) {
//                     botDrawerOut()
//                 }
//                 currentIntersect = null
//             }
//             else if (currentIntersect.object == footballGroup.children[0].children[0] || currentIntersect.object == footballGroup.children[1].children[0]) {
//                 if (clickCounter%2 == 0) {
//                     // openLaptop()
//                     // console.log('animate laptop')
//                     // console.log('change screen texture')
    
//                     floatFootball()

//                     arrayIndex = 2
//                     insertModal(arrayIndex)
//                 }
//                 currentIntersect = null
//             }
//             else if (currentIntersect.object == skateboardGroup.children[0].children[0] || currentIntersect.object == skateboardGroup.children[1].children[0] || currentIntersect.object == skateboardGroup.children[2].children[0] ||currentIntersect.object == skateboardGroup.children[3].children[0]) {
//                 if (clickCounter%2 == 0) {
//                     // openLaptop()
//                     // console.log('animate laptop')
//                     // console.log('change screen texture')
//                     flipBoard()

//                     arrayIndex = 3
//                     insertModal(arrayIndex)
//                 }
//                 currentIntersect = null
//             }
//             else if (currentIntersect.object == sablayGroup.children[0].children[0] || currentIntersect.object == sablayGroup.children[0].children[1] || currentIntersect.object == sablayGroup.children[0].children[2] || currentIntersect.object == sablayGroup.children[0].children[3] || currentIntersect.object == sablayGroup.children[0].children[4] || currentIntersect.object == sablayGroup.children[0].children[5] || currentIntersect.object == sablayGroup.children[0].children[6] || currentIntersect.object == sablayGroup.children[0].children[7] ) {
//                 if (clickCounter%2 == 0) {
//                     // openLaptop()
//                     // console.log('animate laptop')
//                     // console.log('change screen texture')
//                     // !!! sunflowers()

//                     arrayIndex = 4
//                     insertModal(arrayIndex)
//                 }
//                 currentIntersect = null
//             }
//             else if (currentIntersect.object == switchGroup.children[0].children[0] || currentIntersect.object == switchScreen.children[0].children[0] || currentIntersect.object == joyConGroup.children[0].children[0] || currentIntersect.object == joyConGroup.children[1].children[0] || currentIntersect.object == joyConGroup.children[2].children[0] || currentIntersect.object == switchDock.children[0].children[0]) {
//                 if (clickCounter%2 == 0) {
//                     // openLaptop()
//                     // console.log('animate laptop')
//                     // console.log('change screen texture')
//                     switchJump()

//                     arrayIndex = 3
//                     insertModal(arrayIndex)
//                 }
//                 currentIntersect = null
//             }
//             else if (currentIntersect.object == headphoneGroup.children[0].children[0] || currentIntersect.object == headphoneGroup.children[1].children[0]) {
//                 if (clickCounter%2 == 0) {
//                     // openLaptop()
//                     // console.log('animate laptop')
//                     // console.log('change screen texture')
//                     // !!! notesPlaying()

//                     arrayIndex = 5
//                     insertModal(arrayIndex)
//                 }
//                 currentIntersect = null
//             }
//         }
//     }
//  })

//  console.log(headphoneGroup.children[1])

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

window.addEventListener('mousemove', (event) =>
{
    cursor.x = event.clientX / sizes.width - 0.5
    cursor.y = event.clientY / sizes.height - 0.5

})

/**
 * Animate
 */
 let prevTime = 0
 let isTopHalfFloating = false
let currentIntersect = null


let prevParallaxTime = 0
let firstCurrentIntersect = null
let isParallaxOn = false

// let lightUp = false
// let lightTime = 0
// let resetLightTime = false

const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()
    let deltaTime = elapsedTime - prevTime
    // prevTime = elapsedTime
    let parallaxTIme = elapsedTime - prevParallaxTime
    prevParallaxTime = elapsedTime


    // Phase 0 Animations
    if (phase == 0) {
        // Parallax
        if (isParallaxOn == true) {
            // // const parallaxX = cursor.x * 0.5
            const parallaxY = - cursor.y * zoomFactor * zoomFactor
            // // cameraGroup.position.x += ( parallaxX - cameraGroup.position.x ) * 2 * parallaxTIme
            cameraGroup.position.y += ( parallaxY - cameraGroup.position.y ) * 2 * parallaxTIme
            // // cameraGroup.position.z += ( - parallaxX - cameraGroup.position.z ) * 2 * parallaxTIme
        }

        // Arrow bobbles
        P.position.z = - Math.sin(elapsedTime*2) * 0.05 - 105*0.025
        K.position.z = Math.sin(elapsedTime*2) * 0.05 + 105*0.025
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
            console.log(firstCurrentIntersect.object)

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
        const testBox = [topBedframeGroup, topDrawer, midDrawer, botDrawer, laptopGroup, footballGroup, skateboardGroup, sablayGroup, switchGroup, joyConGroup, switchDock, headphoneGroup]
        const intersects = raycaster.intersectObjects(testBox)
    
        for (const object of testBox) {
            // console.log('none')
        }
    
        for (const intersect of intersects) {
            // console.log('hovering')  
        }
    
        if (intersects.length) {
            if (currentIntersect === null) {
                console.log(intersects)
                currentIntersect = intersects[0]
                // console.log(currentIntersect.object)
                // console.log(topBedframeGroup)
    
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

    // if (lightUp == true) {
    //     if (resetLightTime == true) {
    //         lightTime = elapsedTime
    //         resetLightTime = false
    //     }
    //     if (leftDirectionalLight.intensity < 0.6) {
    //         leftDirectionalLight.intensity = (elapsedTime - lightTime) * 0.2
    //         rightDirectionalLight.intensity = (elapsedTime - lightTime) * 0.2
    //     }
    //     else {
    //         lightUp = false
    //     }
    // }
    

    // Update controls
    if (controls.enabled == true) {
        controls.update()
    }


    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()

// Phase initialization


    // var clickCounter = 0

    // let isLaptopOn = false
    // let isAnimationDone = false


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

// Global Light Phase 0
const leftDirectionalLight = new THREE.DirectionalLight(0xff0000, 0)
const rightDirectionalLight = new THREE.DirectionalLight(0xffffff, 0)



const colorChangeRight = () => {
    if (currentColor < directionalLightColors.length - 1) {
        currentColor += 1
    }
    else {
        currentColor = 0
    }

    document.styleSheets[3].cssRules[40].style.backgroundColor = directionalLightColors[currentColor][2]
    document.styleSheets[3].cssRules[40].style.borderColor = directionalLightColors[currentColor][2]

    document.styleSheets[3].cssRules[39].style.backgroundColor = directionalLightColors[currentColor][3]
    document.styleSheets[3].cssRules[39].style.borderColor = directionalLightColors[currentColor][3]

    // document.styleSheets[3].cssRules[14].style.color = directionalLightColors[currentColor][3]
    // document.styleSheets[3].cssRules[15].style.color = directionalLightColors[currentColor][3]


    document.styleSheets[3].cssRules[17].style.color = directionalLightColors[currentColor][2]

    document.styleSheets[3].cssRules[9].style.backgroundColor = directionalLightColors[currentColor][2]


    leftDirectionalLight.color.setHex(directionalLightColors[currentColor][0])
    rightDirectionalLight.color.setHex(directionalLightColors[currentColor][1])  

    // Strip
    generateNewCanvas()
} 

console.log(leftDirectionalLight)

const lightUp = () => {
    gsap.to(leftDirectionalLight, {ease: 'Power3.easeOut', duration: 2, intensity: 0.7})
    gsap.to(rightDirectionalLight, {ease: 'Power3.easeOut', duration: 2, intensity: 0.7})
}

if (phase == 0) {
    
    scene.add(leftDirectionalLight)
    scene.add(rightDirectionalLight)

    scene.add(ambientLight)
    scene.add(pointLight)


    controls.enabled = true
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

 

    setTimeout(() => { 
        scene.remove(ambientLight)
        scene.remove(pointLight)
        // scene.add(leftDirectionalLight)
        // scene.add(rightDirectionalLight)
        lightUp()

        isParallaxOn = true
    }, 1000)
    

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

window.addEventListener('click', () => {
    if (isAnimationPlaying == false) {
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
        
                                setTimeout(() => {
                                    arrayIndex = 0
                                    insertModal(arrayIndex)
                                }, 1250)
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
                            hoverTopBedframeGroup()
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
        
                            arrayIndex = 3
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
                }
            }
        }
    }
    
})
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

    gsap.set(leftNameWall.rotation, {x: 0, y: 0, z: 0})
    gsap.to(leftNameWall.rotation, {duration: 1, x: Math.PI*2})

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
    }, 500)

    setTimeout(() => {
        isAnimationPlaying = false
    }, 1000)

    gsap.set(rightNameWall.rotation, {x: 0, y: 0, z: 0})
    gsap.to(rightNameWall.rotation, {duration: 1, z: Math.PI*2})
}

// Phase Change Sequence
const phaseChange0to1 = (left, right) => {
    clickCounter = 0

    setTimeout(() => {
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

        scene.add(allObjects)

        controls.enabled = false

        scene.remove(left)
        scene.remove(right)
        scene.add(ambientLight)
        scene.add(pointLight)

        phase = 1
        currentLink = 1

        gsap.to(camera.position, {duration: 2, delay: 0.5, x: 9*zoomFactor, y: 9, z: 9*zoomFactor})
    
        setTimeout(() => {
       
            scene.remove(nameGroup)
            scene.remove(leftNameWallPosition)
            scene.remove(rightNameWallPosition)
            controls.target.set(0,0,0)
            controls.enableRotate = true
            controls.enablePan = true
            controls.enableZoom = true
            controls.enabled = true    
            controls.saveState()   

            isLinkClickAllowed = true
        }, 2500)
    }, 200)
}

// Phase Change Sequence
const phaseChange1to0 = (left, right) => { 
    clickCounter = 0

    setTimeout(() => {

        screenGroup.children[0].children[0].material.emissive.r = 0
        screenGroup.children[0].children[0].material.emissive.g = 0
        screenGroup.children[0].children[0].material.emissive.b = 0
        scene.remove(rectAreaLight)

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

        gsap.to(camera.position, {duration: 2, delay: 0.5, x: 5*zoomFactor, y: 35, z: 5*zoomFactor})
    
        setTimeout(() => {
       
            scene.remove(allObjects)
            
            controls.target.set(0,30,0)
            controls.enableRotate = false
            controls.enablePan = false
            controls.enableZoom = false
            controls.enabled = true
            controls.saveState()

            phase = 0

            scene.remove(ambientLight)
            scene.remove(pointLight)

            lightUp()

            isLinkClickAllowed = true
        }, 2500)
    }, 200)
}

// Phase Change 1 to 2
const phaseChange1to2 = () => {
    
}


// Side Bar
let isLinkClickAllowed = true

const sidebarLinkOne = document.getElementById('sidebarLinkOne')
const sidebarLinkTwo = document.getElementById('sidebarLinkTwo')
const sidebarLinkThree = document.getElementById('sidebarLinkThree')
const sidebarCircleOne = document.getElementById('sidebarCircleOne')
const sidebarCircleTwo = document.getElementById('sidebarCircleTwo')
const sidebarCircleThree = document.getElementById('sidebarCircleThree')

// Clicking Links

let currentLink = 0

sidebarLinkOne.addEventListener('click', () => {

    if (isLinkClickAllowed == true) {
        if (currentLink == 1) {
            isLinkClickAllowed = false
            phaseChange1to0(leftDirectionalLight, rightDirectionalLight)
        }
    
        setTimeout(() => {
            sidebarCircleOne.classList.add('current')
            sidebarCircleTwo.classList.remove('current')
            sidebarCircleThree.classList.remove('current')
        }, 500)
    }
})
sidebarLinkTwo.addEventListener('click', () => {

    if (isLinkClickAllowed == true) {
   
        if (currentLink == 0) {
            isLinkClickAllowed = false
            phaseChange0to1(leftDirectionalLight, rightDirectionalLight)
        }
    
        setTimeout(() => {
            sidebarCircleOne.classList.remove('current')
            sidebarCircleTwo.classList.add('current')
            sidebarCircleThree.classList.remove('current')
        }, 500)
    }    
})
sidebarLinkThree.addEventListener('click', () => {
  
    if (isLinkClickAllowed == true) {
        isLinkClickAllowed = true
        currentLink = currentLink
        phase = phase
        // if (currentLink == 1) {
        //     phaseChange1to2()
        // }

        setTimeout(() => {
            sidebarCircleOne.classList.remove('current')
            sidebarCircleTwo.classList.remove('current')
            sidebarCircleThree.classList.add('current')
        }, 500)
    }
})

// Color Change
    console.log(document.styleSheets[3])




