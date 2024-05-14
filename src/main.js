import { SPRITE, scaleFactor } from "./constant";
import { k } from "./kaboomCtx";

k.loadSprite("spritesheet", "./spritesheet.png", {
    // number of frames
    // each frame is 16*16 tile
    sliceX: 39,
    sliceY: 31,
    anims: {
        "idle-down": SPRITE,
        "walk-down": { from: SPRITE, to: (SPRITE + 4), loop: true, speed: 8 },
        "idle-side": (SPRITE + 39),
        "walk-side": { from: (SPRITE + 39), to: (SPRITE + 39 + 4), loop: true, speed: 8 },
        "idle-up": (SPRITE + 39 + 39),
        "walk-up": { from: (SPRITE + 39 + 39), to: (SPRITE + 39 + 39 + 4), loop: true, speed: 8 },
    },
})

k.loadSprite("map", "./02 messing with tiled/map.png");

k.setBackground(k.Color.fromHex("#311047"));

k.scene("main", async() => {
    const mapData = await (await fetch("./02 messing with tiled/map.json")).json();
    const layers = mapData.layers;

    const map = k.make([
        k.sprite("map"),
        k.pos(0),
        k.scale(scaleFactor)
    ]);

    const player = k.make([

        k.sprite("spritesheet", { anim: "idle-down" }),

        // automatically create a hitbox for the player
        k.area({
            shape: 
            new k.Rect(k.vec2(0, 3), 10, 10)
        }),

        k.body(),
        k.anchor("center"),
        k.pos(),
        k.scale(scaleFactor),

        {
            speed: 250,
            direction: "down",
            isInDialogue: false,
        },

        // tag to check for collisions
        "player",

    ]);

    for (const layer of layers) {
        if (layer.name == "bounds") {
            for (const bounds of layer.objects) {
                map.add([
                    k.area({
                        shape: new k.Rect(k.vec2(0), bounds.width, bounds.height),
                    }),
                    k.body({ isStatic: true }),
                    k.pos(bounds.x, bounds.y),
                    bounds.name,
                ]);

                if (bounds.name) {
                    player.onCollide(bounds.name, () => {
                        player.isInDialogue = true;
                        // TODO
                    })
                }
            }
        }
    }
});

k.go("main");