import platform from '../img/platform.png'
import hills from '../img/hills.png'
import background from '../img/background.png'
console.log(platform)
const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

console.log(c)

const gravity = 0.5
class Player {
  constructor() {
    this.position = {
      x: 100,
      y: 100
    }
    this.velocity = {
      x: 0,
      y: 0
    }
    this.width = 30
    this.height = 30

  }
  draw() {
    c.fillStyle = 'red'
    c.fillRect(this.position.x, this.position.y, this.width, this.height)
  }

  update() {
    this.draw()
    this.position.x += this.velocity.x
    this.position.y += this.velocity.y
    if (this.position.y + this.height + this.velocity.y <= canvas.height)
      this.velocity.y += gravity
    else this.velocity.y = 0

  }
}

class Platform {
  constructor({ x, y, image }) {
    this.position = {
      x,
      y
    }

    this.width = image.width
    this.height = image.height
    this.image = image
  }

  draw() {
    c.drawImage(this.image, this.position.x, this.position.y)
  }
}

class GenericObject {
  constructor({ x, y, image }) {
    this.position = {
      x,
      y
    }

    this.width = image.width
    this.height = image.height
    this.image = image
  }

  draw() {
    c.drawImage(this.image, this.position.x, this.position.y)
  }
}

function createImage(imageSrc) {
  const image = new Image()
  image.src = imageSrc
  return image
}
const image = new Image()
image.src = platform

console.log(image)

const platformImage = createImage(platform)

const player = new Player()
const platforms = [new Platform({
  x: -1,
  y: 470,
  image: platformImage
}),
new Platform({
  x: platformImage.width - 3,
  y: 470,
  image: platformImage
})]

const genericObjects = [
  new GenericObject({
    x: -1,
    y: -1,
    image: createImage(background)
  }),
  new GenericObject({
    x: -1,
    y: -1,
    image: createImage(hills)
  })
  
  

]
const keys = {
  right: {
    pressed: false
  },
  left: {
    pressed: false
  }
}

let scrollOffset = 0

function animate() {
  requestAnimationFrame(animate)
  c.fillStyle = 'white'
  c.fillRect(0, 0, canvas.width, canvas.height)
  genericObjects.forEach(genericObject => {
    genericObject.draw()
  })

  platforms.forEach(platform => {
    platform.draw()
  })
  player.update()

  if (keys.right.pressed && player.position.x < 400) {
    player.velocity.x = 5
  } else if (keys.left.pressed && player.position.x > 100) {
    player.velocity.x = -5
  } else {
    player.velocity.x = 0

    if (keys.right.pressed) {
      scrollOffset += 5
      platforms.forEach(platform => {
        platform.draw()
        platform.position.x -= 5
      })
      genericObjects.forEach(genericObject=>{
        genericObject.position.x -= 3
      })
    } else if (keys.left.pressed) {
      scrollOffset -= 5
      platforms.forEach(platform => {
        platform.draw()
        platform.position.x += 5
      })

      genericObjects.forEach(genericObject=>{
        genericObject.position.x += 3
      })
    }

  }

  console.log(scrollOffset)


  //platform collision detection
  platforms.forEach((platform) => {
    if (player.position.y + player.height <= platform.position.y
      && player.position.y + player.height + player.velocity.y
      >= platform.position.y && player.position.x + player.width >= platform.position.x
      && player.position.x <= platform.position.x + platform.width) {
      player.velocity.y = 0
    }
  })

  if (scrollOffset > 2000) {
    console.log('YOU WIN!')
  }
}

animate()

window.addEventListener('keydown', ({ keyCode }) => {
  console.log(keyCode)
  switch (keyCode) {
    case 37:
      console.log('left')
      keys.left.pressed = true
      break

    case 38:
      console.log('up')
      player.velocity.y -= 10
      break

    case 39:
      console.log('right')
      keys.right.pressed = true
      break

    case 40:
      console.log('down')
      break
  }
  console.log(keys.right.pressed)
})

window.addEventListener('keyup', ({ keyCode }) => {
  console.log(keyCode)
  switch (keyCode) {
    case 37:
      console.log('left')
      keys.left.pressed = false
      break

    case 38:
      console.log('up')
      break

    case 39:
      console.log('right')
      keys.right.pressed = false
      break

    case 40:
      console.log('down')
      break
  }

  console.log(keys.right.pressed)
})