import { SPRITE, dialogueData, scaleFactor } from "./constant";
import { k } from "./kaboomCtx";
import displayDialogue, { setCamScale } from "./utils";

k.loadSprite("spritesheet", "./spritesheet.png", {
    // number of frames
    // each frame is 16*16 tile
    sliceX: 39,
    sliceY: 31,
    anims: {
        "idle-down": SPRITE,
        "walk-down": { from: SPRITE, to: (SPRITE + 3), loop: true, speed: 8 },
        "idle-side": (SPRITE + 39),
        "walk-side": { from: (SPRITE + 39), to: (SPRITE + 39 + 3), loop: true, speed: 8 },
        "idle-up": (SPRITE + 39 + 39),
        "walk-up": { from: (SPRITE + 39 + 39), to: (SPRITE + 39 + 39 + 3), loop: true, speed: 8 },
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

    k.add(map);

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
        if (layer.name === "bounds") {
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
                        displayDialogue(dialogueData[bounds.name], () => (player.isInDialogue = false))
                    })
                }
            }
        }

        if (layer.name === "spawnpoint") {
            for (const entity of layer.objects) {
                if (entity.name === "player") {
                    player.pos = k.vec2(
                        (map.pos.x + entity.x) * scaleFactor,
                        (map.pos.y + entity.y) * scaleFactor
                    );
                    k.add(player);
                }
            }
        }
    }

    setCamScale(k)

    k.onResize(() => {setCamScale(k)})

    k.onUpdate(() => {
        k.camPos(player.pos.x, player.pos.y + 100);
    })

    k.onMouseDown((mouseBtn) => {
        if (mouseBtn != "left" || player.isInDialogue) return;
        const worldMousePos = k.toWorld(k.mousePos());
        player.moveTo(worldMousePos, player.speed);

        const mouseAngle = player.pos.angle(worldMousePos);

        const lowerBound = 50;
        const upperBound = 125;

        if (
            mouseAngle > lowerBound &&
            mouseAngle < upperBound &&
            player.curAnim() !== "walk-up"
        ) {
            player.play("walk-up");
            player.direction = "up";
            return;
        }

        if (
            mouseAngle < -lowerBound &&
            mouseAngle > -upperBound &&
            player.curAnim() !== "walk-down"
        ) {
            player.play("walk-down");
            player.direction = "down";
            return;
        }

        if (Math.abs(mouseAngle) > upperBound) {
            player.flipX = false;
            if (player.curAnim() !== "walk-side") player.play("walk-side");
            player.direction = "right";
            return;
        }

        if (Math.abs(mouseAngle) < lowerBound) {
            player.flipX = true;
            if (player.curAnim() !== "walk-side") player.play("walk-side");
            player.direction = "left";
            return;
        }

    });

    k.onMouseRelease(() => {
        if (player.direction === "down") {
            player.play("idle-down");
            return;
        };
        if (player.direction === "up") {
            player.play("idle-up");
            return;
        };
        player.play("idle-side");
    })

});



k.go("main");