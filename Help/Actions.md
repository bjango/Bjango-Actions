# Bjango Actions

- [Bjango Actions](https://github.com/bjango/Bjango-Actions/blob/Help/Actions.md)
- [Bjango Scale Actions](https://github.com/bjango/Bjango-Actions/blob/Help/Help.md#Bjango-Scale-Actions)
- [Bjango Tools Panel](https://github.com/bjango/Bjango-Actions/blob/Help/Help.md#Bjango-Tools-Panel)
- [Hazel Rules](https://github.com/bjango/Bjango-Actions/blob/Help/Help.md#Hazel-Rules)
- [Photoshop Scripts](https://github.com/bjango/Bjango-Actions/blob/Help/Help.md#Photoshop-Scripts)
- [OS X Workflows](https://github.com/bjango/Bjango-Actions/blob/Help/Help.md#OS-X-Workflows)
- [Feedback and future plans](https://github.com/bjango/Bjango-Actions/blob/Help/Help.md#Feedback-and-future-plans)

-----

### Pixel Snapping On and Pixel Snapping Off

These enable and disable Snap Vector Tools and Transforms to Pixel Grid. Please note that you need Photoshop CS6, CC or CC 2014 for these actions to function.
			
-----

### New 512×512 and 1024×1024 document

Actions to create 512×512 and 1024×1024 pixel 72DPI documents, with global light set to 90º, and the display’s colour space (`Don’t Color Manage This Document`).

-----

### Don’t Colour Manage

Assigns the colour profile of `Don’t Color Manage This Document`, which is how all your UI documents should be, if you don’t like your colours being butchered. The new document Actions also assign `Don’t Color Manage This Document` as the colour profile, so you shouldn’t need this one too often.

-----

### Set Global Light to 90&deg;

Sets the light source used for Layer Styles to directly above, which matches Apple’s HIG and the native iOS and Mac UI (as well as most other platforms). To accomplish this, the Action creates a bitmap layer, sets the light, then deletes the layer. This was done so the Action works, no matter what you have selected.

-----

### View Shadow Detail

Inserting a Levels Adjustment layer can help you see and edit details hidden deep in the darker portions of your image. This is a trick I started using years ago, when retouching photos, but it works just as well for UI design. It’s far easier and better than cranking up the brightness on your display, which only goes so far. Just run this Action and move the adjustment layer to the very top layer. Turn it on when you need to see shadow details. Turn it off the rest of the time.
			
-----

### Add Colour Blindness Testing

This action adds a group with the three main colour blindness types, monochrome and a value check as adjustment layers. Place the group at the top of your layers and toggled the adjustment layers on and off to view your entire document with the colour blindness type applied.

-----

### Enlarge Canvas

Adds 100 pixels to the width and height of the document. Want even more workspace? Run the Action a few times. Yep, this one is me being very lazy. It reduces some of the thinking when you’re running out of canvas space though.

-----

### Trim Transparent

Trims the document to the smallest possible size, removing transparent pixels.

-----

### Copy/Paste Attributes and Styles

Copy Attributes and Styles copies the currently selected shape layer’s shape attributes (fill, stroke etc) and layer styles. Only works when a single shape layer is selected.

Paste Attributes and Styles pastes the shape attributes and layer styles on the clipboard to the currently selected layers.

-----

### Copy Merged to New

Copies the current bitmap selection using Copy Merged, creates a new document to match the clipboard’s size, then pastes.
			
-----

### Copy Entire Canvas

Copies the entire canvas using Copy Merged.

-----

### Show Optimal Size

Shows the smallest size the currently selected region can be cropped without clipping the image data. Show Optimal Size requires a marquee selection and works best when the layer or layers and marquee selection is sitting on a transparent area.

Normally, this action would be used on non-rectangular icons or shapes where you’re trying to find the optimal size when cutting up an image for exporting. Note that the result may be offset (I haven’t found a solution for this). This action is great in conjunction with Make Slice From Layer, allowing you to find the size needed for a slice. I prefer it to layer based slices, because this method works when you have slices based on many layers or an entire group.

-----

### Make Slice From Layer

I use slices, but don’t like creating them with the Slice tool — I prefer using the marquee selection tool to create the region, then create a bitmap layer and fill. This has two advantages: I find it far easier to see what’s going on accurately (the slice creation tool uses a thin, light, dotted line to show the slice you’re making), and if you need to create loads of slices at the same size, you can move the bitmap layer around and keep creating slices from it. This is ideal when building <a href="/articles/exporting/">slice sheets</a> of same-sized elements. This action can advances to the layer below. You can disable that ability by unchecking the Select Backward Layer item in the Actions panel (when it’s not in Button mode).

-----

### Make Slice From Selection

As above, but the slice is created from the current selection. Works well in conjunction with the marquee selection tool.

-----

### Make 9-Patch From Selection

Select an area with the marquee selection tool and this action will create a bitmap layer and add the appropriate Android 9-patch black 1 pixel lines around it. From there you can trim the lines to provide the correct stretch and padding areas.

-----

### Center in Selection

Centers the currently selected layers within the current bitmap selection. This means the Magic Wand tool or the Marquee tool can be used for quick positioning.

-----

### Center on Canvas

Centers the currently selected layers on the canvas.

-----

### Dupe and Create Smart Object

Duplicates the currently selected layers, then turns the duplicate into a Smart Object, leaving the original untouched.

-----

### Dribbble Selection

Creates a 300×400 pixel marquee selection. Move the selection as desired, and run the action again to have the selection copied to a new document, ready to be saved as a PNG and uploaded to Dribbble for the world to see.
			
-----

### Dribbble @2x Selection

Creates a 600×800 pixel marquee selection. Use as above, but for Retina-sized Dribbble shots.

-----

### OS Default Text Antialiasing

Select some text layers, run this to change the antialiasing the OS default. This action requires Photoshop CC.
			
-----

### Create Grey Block

Creates a solid fill layer, often suitable as a nice background. It will be placed as the bottom layer.