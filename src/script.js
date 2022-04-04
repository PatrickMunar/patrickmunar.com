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

// h1, h3
const textArray = [
    ['About Me',
    '...',
    "..."],
    ['Flag Football',
    '...',
    '...'],
    ['Hobbies & Interests',
    '...',
    '...'],
    ['Education',
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
    // Canvas
    const canvas = document.querySelector('canvas.miniWebGL')

    // Scene
    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0xB90000)

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
        color: 0x000000,
        linewidth: 1
    } ) )
    boxLine.position.set(0,0.05,0)
    scene.add( boxLine )

    const coneGeometry = new THREE.BoxGeometry( 0.4, 0.4, 0.4 )
    const coneEdges = new THREE.EdgesGeometry( coneGeometry )
    const coneLine = new THREE.LineSegments( coneEdges, new THREE.LineBasicMaterial( {
        color: 0x000000,
        linewidth: 1
    } ) )
    scene.add( coneLine )
    coneLine.position.set(-0.15, -3.5, -6)

    const box4Geometry = new THREE.BoxGeometry( 0.4, 0.4, 0.4 )
    const box4Edges = new THREE.EdgesGeometry( box4Geometry )
    const box4Line = new THREE.LineSegments( box4Edges, new THREE.LineBasicMaterial( {
        color: 0x000000,
        linewidth: 1
    } ) )
    scene.add( box4Line )
    box4Line.position.set(-0.5, -3.5, -15)

    const sphereGeometry = new THREE.BoxGeometry( 0.7, 0.7, 0.7 )
    const sphereEdges = new THREE.EdgesGeometry( sphereGeometry )
    const sphereLine = new THREE.LineSegments( sphereEdges, new THREE.LineBasicMaterial( {
        color: 0x000000,
        linewidth: 1
    } ) )
    sphereLine.position.set(-0.4,4,-6)
    scene.add( sphereLine )


    // Base camera
    const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 100)
    // camera.rotation.y = Math.PI
    camera.position.set(0,0,5)
    scene.add(camera)


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
    // renderer.shadowMap.type = THREE.PCFSoftShadowMap
    renderer.outputEncoding = THREE.sRGBEncoding
    renderer.toneMapping = THREE.CineonToneMapping

        /**
     * Animate
     */
    let prevTime = 0

    const clock = new THREE.Clock()

    const tick = () =>
    {
        const elapsedTime = clock.getElapsedTime()
        let deltaTime = elapsedTime - prevTime

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
// Texture loader
const textureLoader = new THREE.TextureLoader()

const offLaptopTexture = textureLoader.load(
    'OffLaptop.jpg'
)

const offLaptopMaterial = new THREE.MeshStandardMaterial({
    map: offLaptopTexture
})

const whiteMaterial = new THREE.MeshStandardMaterial({
    color: 'white'
})

// Draco loader
const dracoLoader = new DRACOLoader()
dracoLoader.setDecoderPath('draco/')

// GLTF loader
const gltfLoader = new GLTFLoader()
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


scene.add(allObjects)
allObjects.position.y = -3
allObjects.rotation.y = - Math.PI*0.25


// GLTF Loader
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

        console.log(obj)
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

        console.log(obj)
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

        console.log(obj)
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

        console.log(obj)
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

        console.log(obj)
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

        console.log(obj)
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

        console.log(obj)
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

        console.log(obj)
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

        console.log(obj)
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

        console.log(obj)
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

        console.log(obj)
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

        console.log(obj)
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

        console.log(obj)
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

        console.log(obj)
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

        console.log(obj)
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

        console.log(obj)
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

        console.log(obj)
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

        console.log(obj)
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

        console.log(obj)
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

        console.log(obj)
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

        console.log(obj)
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
        obj.scene.traverse((child) => {
            child.material = offLaptopMaterial
        })

        scene.add(obj.scene)
        obj.scene.scale.set(0.05,0.05,0.05)
        // room.scene.position.y = -1
        // room.scene.rotation.y = Math.PI * 0.25
        // floor.scene.position.x = -1.5
        // room.scene.position.z = 1.5
        // room.scene.position.set(-1,0,5)
        // room.scene.rotation.y = Math.PI * 0.25
        

        console.log(obj)
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

        console.log(obj)
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

        console.log(obj)
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

        console.log(obj)
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

        console.log(obj)
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

        console.log(obj)
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

        console.log(obj)
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

        console.log(obj)
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

        console.log(obj)
        wallsandfloor.add(obj.scene)
        // obj.scene.castShadow = true
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

        console.log(obj)
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

        console.log(obj)
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

        console.log(obj)
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

        console.log(obj)
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

        console.log(obj)
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
const ambientLight = new THREE.AmbientLight(0xaa00ff, 0.1)
const offAmbientLight = new THREE.AmbientLight(0xffffff, 0.2)
scene.add(ambientLight)


const pointLight = new THREE.PointLight(0x1100ff, 1)
const offPointLight = new THREE.PointLight(0xaaaaff, 0.75)


pointLight.position.set(-12,12,12)
pointLight.castShadow = true
pointLight.shadow.mapSize.x = 1024*4
pointLight.shadow.mapSize.y = 1024*4
pointLight.shadow.camera.near = 5
pointLight.shadow.camera.far = 50
pointLight.shadow.normalBias = 0.05
pointLight.shadow.radius = 5

offPointLight.position.set(-12,12,12)
offPointLight.castShadow = true
offPointLight.shadow.mapSize.x = 1024*4
offPointLight.shadow.mapSize.y = 1024*4
offPointLight.shadow.camera.near = 5
offPointLight.shadow.camera.far = 50
offPointLight.shadow.normalBias = 0.05
offPointLight.shadow.radius = 5

scene.add(pointLight)

const rectAreaLight = new THREE.RectAreaLight(0x2222ff, 1000, 0.3, 0.15)
rectAreaLight.position.set(0.4,-1,-2.2)
rectAreaLight.lookAt(new THREE.Vector3(-100,0,100))

// Position Checker
// const box = new THREE.Mesh(new THREE.BoxGeometry(0.3,0.3,0.3), new THREE.MeshNormalMaterial)
// box.position.set(0.35,-1,-2.2)
// scene.add(box)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
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
camera.position.set(0,5,12)

scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.target.set( 0, 0, 0 );
controls.enableDamping = true

controls.maxPolarAngle = Math.PI/2 
controls.minAzimuthAngle = - Math.PI*45/180
controls.maxAzimuthAngle = Math.PI*45/180


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
// renderer.shadowMap.type = THREE.PCFSoftShadowMap
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

 window.addEventListener('click', () => {
    clickCounter += 1
    console.log(clickCounter)
    if (currentIntersect) {
        console.log('click')
            if (currentIntersect.object == laptopGroup.children[0].children[0] || currentIntersect.object == laptopGroup.children[1].children[0] || currentIntersect.object == screenGroup.children[0].children[0]) {
                if (clickCounter%2 == 0) {
                    lightLaptop()
    
                    arrayIndex = 0
                    insertModal(arrayIndex)
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

                    arrayIndex = 1
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

                    arrayIndex = 2
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

                    arrayIndex = 3
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

                    arrayIndex = 2
                    insertModal(arrayIndex)
                }
                currentIntersect = null
            }
        }
    }
 })

// Raycaster
const raycaster = new THREE.Raycaster()


// GSAP Animations

const hoverTopBedframeGroup = () => {
    gsap.to(topBedframeGroup.position, {duration: 1, delay: 0.5, y: 4})
    // moveObjects()
}

const topDrawerOut = () => {
    gsap.to(topDrawer.position, {duration: 1, delay: 1, z: 13*0.05})
    gsap.to(topDrawer.position, {duration: 1, delay: 3, z: 0})
}

const midDrawerOut = () => {
    gsap.to(midDrawer.position, {duration: 1, delay: 1, z: 13*0.05})
    gsap.to(midDrawer.position, {duration: 1, delay: 3, z: 0})
}

const botDrawerOut = () => {
    gsap.to(botDrawer.position, {duration: 1, delay: 1, z: 13*0.05})
    gsap.to(botDrawer.position, {duration: 1, delay: 3, z: 0})
}

const lightLaptop = () => {
    screenGroup.children[0].children[0].material.map = ''
    scene.add(rectAreaLight)

    scene.remove(ambientLight)
    scene.add(offAmbientLight)
    scene.remove(pointLight)
    scene.add(offPointLight)
    scene.background = new THREE.Color(0x000000)
    
    screenGroup.children[0].children[0].material.emissive.r = 1
    screenGroup.children[0].children[0].material.emissive.g = 1
    screenGroup.children[0].children[0].material.emissive.b = 1

    allObjects.add(galaxy)

    isLaptopOn = true
}

const floatFootball = () => {

    gsap.set(footballGroup.rotation, {z: - Math.PI*40/180, x: 0})
    gsap.to(footballGroup.position, {ease: 'Power3.easeOut', duration: 0.75, delay: 0.5, y: 4})
    gsap.to(footballGroup.position, {ease: 'Power3.easeIn', duration: 0.75, delay: 1.25, y: 2.8})

    gsap.to(footballGroup.rotation, {ease: 'Power3.easeOut',duration: 0.5, delay: 0.5, x: - Math.PI*45/180})
    gsap.to(footballGroup.rotation, {duration: 1.4, delay: 0.5, z: Math.PI*2*4 - Math.PI*40/180})
    gsap.to(footballGroup.rotation, {ease: 'Power1.easeIn', duration: 0.5, delay: 1, x: Math.PI*45/180})
 
    
    gsap.to(footballGroup.rotation, {ease: 'Power1.easeInOut', duration: 0.25, delay: 1.9, x: 0})

    // moveObjects()
}

const flipBoard = () => {
    gsap.set(skateboardGroup.rotation, {z: Math.PI, y: 0})
    gsap.to(skateboardGroup.position, {ease: 'Power1.easeOut', duration: 0.6, delay: 0.5, y: 1})
    gsap.to(skateboardGroup.rotation, {ease: 'Power0.easeNone', duration: 1, delay: 0.55, z: Math.PI*2 + Math.PI, y: Math.PI*2})
    gsap.to(skateboardGroup.position, {ease: 'Power1.easeIn', duration: 0.45, delay: 1.0, y: 6.1*0.05})

    // moveObjects()
}

const switchJump = () => {
    gsap.to(joyConGroup.position, {ease: 'Power1.easeOut', duration: 1, delay: 0.5, y: 0.5})
    gsap.to(joyConGroup.position, {ease: 'Power1.easeIn', duration: 0.75, delay: 1.5, y: 0})
    gsap.to(switchGroup.position, {ease: 'Power1.easeOut', duration: 0.5, delay: 1, y: 0.5})
    gsap.to(switchGroup.position, {ease: 'Power1.easeIn', duration: 0.75, delay: 1.5, y: 0})
    gsap.to(switchScreen.position, {ease: 'Power1.easeOut', duration: 0.5, delay: 1, y: 0.5})
    gsap.to(switchScreen.position, {ease: 'Power1.easeIn', duration: 0.75, delay: 1.5, y: 0})

    setTimeout(() => {
        switchScreen.children[0].children[0].material.emissive.r = 1
        switchScreen.children[0].children[0].material.emissive.g = 1
        switchScreen.children[0].children[0].material.emissive.b = 1
    }, 1350)

    setTimeout(() => {
        switchScreen.children[0].children[0].material.emissive.r = 0
        switchScreen.children[0].children[0].material.emissive.g = 0
        switchScreen.children[0].children[0].material.emissive.b = 0
    }, 2200)

}


// Object Positions

footballGroup.position.set(1.9,2.8,-1.9)
footballGroup.rotation.z = - Math.PI*40/180
footballGroup.rotation.y = - Math.PI*60/180

skateboardGroup.rotation.z = Math.PI
skateboardGroup.position.y = 6.1*0.05
skateboardGroup.position.z = 1.5
skateboardGroup.position.x = 1.5



// Mouse
const mouseParallax = new THREE.Vector2()

window.addEventListener('mousemove', (event) =>
{
    mouseParallax.x = event.clientX / sizes.width * 2 - 1
    mouseParallax.y = - (event.clientY / sizes.height) * 2 + 1

})

/**
 * Animate
 */
 let prevTime = 0
 let isTopHalfFloating = false
let currentIntersect = null
let elapsedTime

const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()
    let deltaTime = elapsedTime - prevTime
    // prevTime = elapsedTime

    // prevTime = elapsedTime
    // console.log(topBedframeGroup.position.y)

    galaxy.rotation.y = elapsedTime * 0.2



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

    const testBox = [topBedframeGroup, topDrawer, midDrawer, botDrawer, laptopGroup, footballGroup, skateboardGroup, sablayGroup, switchGroup, joyConGroup, switchDock]
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

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()
