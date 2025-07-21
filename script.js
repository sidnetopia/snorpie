  /**
   * Author: Michael Hadley, mikewesthad.com
   * Asset Credits:
   *  - Tuxemon, https://github.com/Tuxemon/Tuxemon
   */

  const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: "game-container",
    pixelArt: true,
    physics: {
      default: "arcade",
      arcade: {
        gravity: { y: 0 } } },


    scene: {
      preload: preload,
      create: create,
      update: update } };



  const game = new Phaser.Game(config);
  let cursors;
  let player;
  let popup;
  let popupShown = false;
  let showDebug = false;
  let targetTile = null;
  let moveTween = null;

  const popupData = [
    { x: 8, y: 35, message: "Happy Monthsary to the one I love the most!" },
    {
      x: 19,
      y: 35,
      message: "On May 19, we met on Bumble.\n\
    I remember asking you about the black floaters in my eyes, and you gave me a serious answer.\
    I also shared what caused them.\
    Then I asked you what made you swipe right on me, and you mentioned that you were bored and did a massive swipe right.\
    I thanked you because that gave me the chance to get to know you better.\
    \
    As time went by, I grew attached to you on Bumble—to the point that I started looking for your attention every day, even poking you.\
    I asked if it was okay to add you on Instagram or Messenger.\
    You said you were still hesitant, which I completely understood.\
    But you also said, \"Pero kung magiging part ka naman soon ng loved ones, why not?\"\
    That made me start to like you—and eventually, fall in love with you.\
    \
    The more I got to know you, the more I discovered hidden qualities that weren't on your Bumble profile—qualities that made me fall for you even more.\
    You didn’t judge me for liking anime or see me as a nerd or a creep.\
    In fact, you liked it too."
    },
    { x: 6, y: 26, message: "Also, I remember the last time we were at karaoke—I really appreciated how you still responded to my \
      messages so quickly. Even when we were bonding with my grad school friends, I chose to keep talking with \
      you because it genuinely made me happy.\
      We also talked about things like you not wanting a boyfriend, your fears about marriage, and even deeper \
      topics like politics, religion, and kindness. I understood your worries back then—and through those \
      conversations, I came to love you even more for who you truly are. \
      Back then, I told you that even if you weren’t interested, \
      I was willing to quietly support you from the shadows—because from the way we talked, \
      I could already see that you had a genuinely good heart." },
    { x: 14, y: 26, message: "Around June 6-8, we moved to Telegram before I went home to the province. I remember you dropping hints that it was okay to switch apps, and when we finally did, it made me really happy—because it felt like you were starting to trust me.\
\
We even played ML together, even if it was just classic mode since we had different ranks. I wanted to stick with you and be cool, but we still lost haha.\
\
When I got home, our conversations continued. I know I was a bit annoying back then for asking about your past relationship—it made me a little jealous, and I think that may have led you to delete Telegram. But even after that, you reached out to me, apologizing and saying I was nice.\
\
And from there, our conversations became even deeper—beyond just relationships. We talked about how we’re growing as adults, and you listened and understood so openly. That meant a lot to me." },
,
  { 
    x: 21, 
    y: 26, 
    message: "I reserved this slot because I know how much you love anything related to the medical field—like how you used to be intrigued by your aunts’ medical books. I also admire how you chose to pursue optometry over medtech, and how your heart is so close to the elderly, especially with your desire to specialize in their care.\n\nWhen I got home, you felt like my personal doctor—always checking up on me. I’ll never forget what you said: \"Alagaan mo muna sarili mo kasi wala pa ako sa tabi mo para gawin 'yan.\" That really stayed with me. I also want to include that you have seasonal rhinitis and allergies on fur and almonds."
  },
  { 
    x: 30, 
    y: 26, 
    message: "I wish for us, Anne, to stay strong and grow old together. And I also hope you’ll let me be the one to make you happy."
  },
  { 
    x: 27, 
    y: 17, 
    message: "I love how we share so many of the same interests—from music to food, and even the experience of being the youngest in the family. I’ve always told you how natural and fun it feels to talk to you because of everything we have in common.\n\nI even started running and doing skincare, not just for myself, but because I wanted to connect with you through the things you enjoy. I also learned how to drive so that when we finally meet in person, I can be the one to pick you up—maybe through Grab at first—but eventually, I’ll be the one driving if you're using your car.\n\nI really appreciate the K-dramas you recommended, like Hi Bye, Mama and Heavenly Ever After. I haven’t watched Heavenly Ever After yet, but Hi Bye, Mama really struck me—the way it balanced drama and warmth was so beautiful.\n\nI hope someday we can watch random shows together, just relaxing and enjoying each other's company.\n\nAnd of course, I’ll never forget when you told me that it feels light just knowing I play with my pets—and especially with GooGoo, your crushie cakes. All of these little things make me genuinely happy."
  },
  {
    x: 19,
    y: 17,
    message: "It was on Telegram—you were wearing that white dress with a shrug. That was the first time I saw you from a different angle, not just the one from Bumble. I remember wanting to send you pictures of myself too, but I hesitated because I felt ugly. Still, even when I told you that, you always reassured me that I wasn’t. On July 17, we moved our conversations to Messenger. On the day of my friend’s wedding, I told myself I wanted to look good so I could send you a photo. And when I did, you told me I looked pogi—that meant so much to me. Back then, I promised there was no third party, and if there was any way I could prove how serious I was, I would. Even though you told me you were strong and independent, I still wanted to care for you—genuinely and deeply. Then came July 22, a Sunday. We talked about you wanting a boy cut, and I told you to go for it if that would make you happy—because I’d support you in every way I could. Honestly, I felt a little sad when you mentioned liking girls—not because I judged you, but because by then, I was already really into you. You noticed I was a bit down and hit me with the song “Ruin My Life.” Later, I asked you what your 'yes' meant—I was confused. But when I confirmed you liked me too, I swear I felt like the happiest person alive. ♥️ Then you called me slow—and I really am! You even gave me the nickname 'Slow na BF' ✨. I’ve kept that nickname ever since, because it came from you. And the way you said it made it feel special."
  },
  {
    x: 10,
    y: 17,
    message: "Anne, as we continue this relationship, I know we’ve faced our share of arguments and issues. I’m truly sorry—especially for the times I’ve disappointed you. But moving forward, I’m asking for the chance to grow and become better, because I believe that with you, I can be.\n\nEven just by coming home, you’ve already helped me become a better version of myself. And as we go on, you’ve helped me see parts of myself I never noticed before. Please see the man I’m becoming—the one who’s growing for you, and the one who hopes to be your last."
  },
  { 
    x: 22, 
    y: 9, 
    message: "Listing the things you like:\n- Color: Pink\n- Ulam: Pork sinigang, salmon belly\n- Tea: Matcha\n- Anime: Tokyo Revengers, Haikyuu\n- Pasta: Pesto\n- Snack: Matcha\n- Go-to food: Army Navy burger, pizza, puto bumbong, balot, etc. \n- Favorite restaurants: Manam, Yabu, Siklab, and coffee shops in Angono, Rizal\n- Accessories: Necklaces and pendants\n- Go-to song: I'm Fine Thank You — https://open.spotify.com/track/1J6tDbBnb2RZsiRprp3jQq?si=f010dfd15d734a18\n- Artists: LANY, Dionela, Adie, Taylor Swift, LADIES' CODE\n\nIn case you’ve forgotten how much you really mean to me, let me remind you through all these little things—and through the small glass buildings we’re building together."
  },
  { 
    x: 6, 
    y: 4, 
    message: "1. You're beautiful, inside and out.\nAt first glance, I thought you were really pretty—and as I got to know you, I realized you’re just as beautiful on the inside.\n\n2. When you talked about your reason for choosing your specialization, it genuinely touched me.\nIt showed me the kind of heart you have—kind, thoughtful, and full of purpose."
  }, 
  { 
    x: 13, 
    y: 4, 
    message: "3. You take care of me, even from a distance.\nThe way you check up on me, remind me to take my meds, and give advice like I’m your patient—it means so much to me.\n\n4. You’ve changed me in ways I didn’t expect.\nYou made me want to take better care of myself. And you're always there, even when I’m just being playful and poking you 😆"
  },
  { 
    x: 6, 
    y: 9, 
    message: "5. We have so many things in common, and I love that.\nOur shared interests and the way we talk—it all feels so natural and it truly makes my heart melt.\n\n6. The way you said you wanted me to be your first and last, even though I’m immature and sometimes insensitive, means so much to me.\nAnd the fact that you continue to hold on, believing I can be better—that gives me strength every day."
  },
  {
    x: 13,
    y: 9,
    message: "7. I appreciate the way you talk to me—even about the little things.\nIt makes me feel seen, heard, and valued. And whenever there’s a chance, you even compliment me, which means more than you know.\n\nI also love how you open up and share parts of your life with me. It shows how much you trust me, and that means a lot. Of course, I’d love to get to know you even more.\n\nEven the smallest things you share—like your fur allergies or past experiences—make me want to care for you more, in all the quiet, gentle ways you deserve."
  },
  {
    x: 33,
    y: 9,
    message: "I hope you enjoy this small retro game I made for you, Anne. The next steps in the game are still missing—but just like us, it's a story in progress. As we continue to grow together, I hope this game becomes as big and beautiful as the world, filled with moments and memories that are ours.\n\nThere are still things I want to say, and I'm hoping we can have our call on our monthsary. I really hope we get to meet in person soon, so I can take care of you and love you the best way I know how.\n\nLet’s make this official soon, Anne—not in a rush, but when you’re ready. I just want you to know that I’m here for you, and I’ll be waiting patiently until you are. I want to know you even more deeply. I love you."
  }
  
  ];
  const triggeredPopups = new Set();

  function preload() {
    this.load.image("tiles", "https://mikewesthad.github.io/phaser-3-tilemap-blog-posts/post-1/assets/tilesets/tuxmon-sample-32px-extruded.png");
    this.load.tilemapTiledJSON("map", "https://raw.githubusercontent.com/sidnetopia/phaser-3-tilemap-blog-posts/refs/heads/master/examples/post-1/assets/tilemaps/new-tuxemon-town2.json");

    // An atlas is a way to pack multiple images together into one texture. I'm using it to load all
    // the player animations (walking left, walking right, etc.) in one image. For more info see:
    //  https://labs.phaser.io/view.html?src=src/animation/texture%20atlas%20animation.js
    // If you don't use an atlas, you can do the same thing with a spritesheet, see:
    //  https://labs.phaser.io/view.html?src=src/animation/single%20sprite%20sheet.js
    this.load.atlas("atlas", "https://raw.githubusercontent.com/sidnetopia/phaser-3-tilemap-blog-posts/master/examples/post-1/assets/atlas/atlas-new2.png", "https://mikewesthad.github.io/phaser-3-tilemap-blog-posts/post-1/assets/atlas/atlas.json");
    this.load.bitmapFont("pixelFont", "https://examples.phaser.io/assets/fonts/bitmap/desyrel.png", "https://examples.phaser.io/assets/fonts/bitmap/desyrel.xml");
  }

  function create() {
    const map = this.make.tilemap({ key: "map" });

    // Parameters are the name you gave the tileset in Tiled and then the key of the tileset image in
    // Phaser's cache (i.e. the name you used in preload)
    const tileset = map.addTilesetImage("tuxmon-sample-32px-extruded", "tiles");

    // Parameters: layer name (or index) from Tiled, tileset, x, y
    const belowLayer = map.createLayer("Below Player", tileset, 0, 0);
    const worldLayer = map.createLayer("World", tileset, 0, 0);
    const aboveLayer = map.createLayer("Above Player", tileset, 0, 0);

    worldLayer.setCollisionByProperty({ collides: true });

    // By default, everything gets depth sorted on the screen in the order we created things. Here, we
    // want the "Above Player" layer to sit on top of the player, so we explicitly give it a depth.
    // Higher depths will sit on top of lower depth objects.
    aboveLayer.setDepth(10);

    // Object layers in Tiled let you embed extra info into a map - like a spawn point or custom
    // collision shapes. In the tmx file, there's an object layer with a point named "Spawn Point"
    const spawnPoint = map.findObject("Objects", obj => obj.name === "Spawn Point");

    // Create a sprite with physics enabled via the physics system. The image used for the sprite has
    // a bit of whitespace, so I'm using setSize & setOffset to control the size of the player's body.
    player = this.physics.add.
    sprite(spawnPoint.x, spawnPoint.y, "atlas", "misa-front").
    setSize(30, 40).
    setOffset(0, 24);

    // Watch the player and worldLayer for collisions, for the duration of the scene:
    this.physics.add.collider(player, worldLayer);

    // Create the player's walking animations from the texture atlas. These are stored in the global
    // animation manager so any sprite can access them.
    const anims = this.anims;
    anims.create({
      key: "misa-left-walk",
      frames: anims.generateFrameNames("atlas", { prefix: "misa-left-walk.", start: 0, end: 3, zeroPad: 3 }),
      frameRate: 10,
      repeat: -1 });

    anims.create({
      key: "misa-right-walk",
      frames: anims.generateFrameNames("atlas", { prefix: "misa-right-walk.", start: 0, end: 3, zeroPad: 3 }),
      frameRate: 10,
      repeat: -1 });

    anims.create({
      key: "misa-front-walk",
      frames: anims.generateFrameNames("atlas", { prefix: "misa-front-walk.", start: 0, end: 3, zeroPad: 3 }),
      frameRate: 10,
      repeat: -1 });

    anims.create({
      key: "misa-back-walk",
      frames: anims.generateFrameNames("atlas", { prefix: "misa-back-walk.", start: 0, end: 3, zeroPad: 3 }),
      frameRate: 10,
      repeat: -1 });


    const camera = this.cameras.main;
    camera.startFollow(player);
    camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

    cursors = this.input.keyboard.createCursorKeys();

  const boxBg = this.add.graphics();

    popupMessage = this.add.text(10, 10, "", {
      fontFamily: "Pixellari",
      fontSize: "15px",
      fill: "#ffffff",
      wordWrap: { width: 280 }
    });

    popup = this.add.container(camera.centerX - 150, camera.centerY - 45, [boxBg, popupMessage]);
    popup.setDepth(100);
    popup.setScrollFactor(0);
    popup.setVisible(false);
    
    // Help text that has a "fixed" position on the screen
    // this.add.
    // text(16, 16, 'Arrow keys to move\nPress "D" to show hitboxes', {
    //   font: "18px monospace",
    //   fill: "#000000",
    //   padding: { x: 20, y: 10 },
    //   backgroundColor: "#ffffff" }).

    // setScrollFactor(0).
    // setDepth(30);

    // // Debug graphics
    // this.input.keyboard.once("keydown-D", event => {
    //   // Turn on physics debugging to show player's hitbox
    //   this.physics.world.createDebugGraphic();

    //   // Create worldLayer collision graphic above the player, but below the help text
    //   const graphics = this.add.
    //   graphics().
    //   setAlpha(0.75).
    //   setDepth(20);
    //   worldLayer.renderDebug(graphics, {
    //     tileColor: null, // Color of non-colliding tiles
    //     collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
    //     faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
    //   });
    // });
    this.input.on("pointerdown", (pointer) => {
      const tileX = Math.floor(this.cameras.main.getWorldPoint(pointer.x, pointer.y).x / 32);
      const tileY = Math.floor(this.cameras.main.getWorldPoint(pointer.x, pointer.y).y / 32);
      
      targetTile = { x: tileX, y: tileY };
    });
  }

  function update(time, delta) {
    const speed = 175;
    const prevVelocity = player.body.velocity.clone();

    // Stop any previous movement
    player.body.setVelocity(0);

    let moving = false;

    // === Click-to-move logic ===
    if (targetTile) {
      const targetX = targetTile.x * 32 + 16;
      const targetY = targetTile.y * 32 + 16;

      const dx = targetX - player.x;
      const dy = targetY - player.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const threshold = 4;

      if (distance > threshold) {
        const angle = Math.atan2(dy, dx);
        player.body.setVelocity(Math.cos(angle) * speed, Math.sin(angle) * speed);
        moving = true;

        // Choose animation based on direction
        if (Math.abs(dx) > Math.abs(dy)) {
          player.anims.play(dx > 0 ? "misa-right-walk" : "misa-left-walk", true);
        } else {
          player.anims.play(dy > 0 ? "misa-front-walk" : "misa-back-walk", true);
        }
      } else {
        targetTile = null;
        player.body.setVelocity(0);
        player.anims.stop();
      }
    }

    // === Manual keyboard movement (if not moving due to click) ===
    if (!moving) {
      if (cursors.left.isDown) {
        player.body.setVelocityX(-speed);
        player.anims.play("misa-left-walk", true);
        moving = true;
      } else if (cursors.right.isDown) {
        player.body.setVelocityX(speed);
        player.anims.play("misa-right-walk", true);
        moving = true;
      }

      if (cursors.up.isDown) {
        player.body.setVelocityY(-speed);
        if (!moving) player.anims.play("misa-back-walk", true);
        moving = true;
      } else if (cursors.down.isDown) {
        player.body.setVelocityY(speed);
        if (!moving) player.anims.play("misa-front-walk", true);
        moving = true;
      }
    }

    // Normalize velocity
    player.body.velocity.normalize().scale(speed);

    // Stop animation if no movement
    if (!moving) {
      player.anims.stop();

      // Set idle frame
      if (prevVelocity.x < 0) player.setTexture("atlas", "misa-left");
      else if (prevVelocity.x > 0) player.setTexture("atlas", "misa-right");
      else if (prevVelocity.y < 0) player.setTexture("atlas", "misa-back");
      else if (prevVelocity.y > 0) player.setTexture("atlas", "misa-front");
    }

    // === Popup trigger (same as yours) ===
    const playerTileX = Math.floor(player.x / 32);
    const playerTileY = Math.floor(player.y / 32);
    let foundPopup = false;

    popupData.forEach(entry => {
      if (playerTileX === entry.x && playerTileY === entry.y) {
        foundPopup = true;

        if (popupMessage.text !== entry.message) {
          popupMessage.setText(entry.message);

          const padding = 20;
          const messageWidth = popupMessage.width + padding;
          const messageHeight = popupMessage.height + padding;

          popup.list[0].clear();
          popup.list[0].fillStyle(0x000000, 0.9);
          popup.list[0].fillRect(0, 0, messageWidth, messageHeight);

          popup.setX(this.cameras.main.centerX - messageWidth / 2);
          popup.setY(this.cameras.main.centerY - messageHeight / 2);
          popupMessage.setX(padding / 2);
          popupMessage.setY(padding / 2);

          popup.setVisible(true);
        }
      }
    });

    if (!foundPopup && popup.visible) {
      popup.setVisible(false);
      popupMessage.setText("");
    }
  }