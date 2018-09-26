# ShaderGif

[ShaderGif](https://shadergif.com) is a GLSL editor loaded with a gif generator.

![screenshot](public/screenshot.png)

# Goals

* Avoid compiling shaders on visitor's GPU
* Be free and open source
* Make nice gifs

# Features

 * Upload textures
 * Download frames as a png zip
 * Create gifs
 * Write and receive comments
 * Gif previews - (Easy on visitor GPU, when compared to ShaderToy)

# Experimental Features

I do not test these often when releasing, so they might be broken sometimes.

 * GPU sound (experimental, be careful with your ears/speakers)
 * MathJS prototyping mode (experimental)

Write an issue or send me an email if you want to try it and it is broken.

# Licence

Shadergif is licenced under the terms of the GNU General Public License v3.0 or later. See LICENCE.txt for the full licence.

# You Want to Code ShaderGif ?

ShaderGif is coded with ruby on rails with Vue.js in the frontend.

A good first step would be to setup the docker machine or a local dev server:

Docker: look at next section.

More info on local dev servers: https://doc.shadergif.com/Development/Server/


# Running Dev Version with Docker

If you can run docker on your machine, follow these instructions.

If you have not cloned the repo yet:

    git clone https://github.com/antoineMoPa/shadergif.git # (You can also clone with ssh)
    cd shadergif

Then:

    docker build -t shadergif .
    docker run -p 3000:3000 -v $(pwd):/editable/shadergif -it shadergif

You can try fixing bugs, adding features, etc. If you make something cool, you can fork, push and create a pull request!

# Documentation

Visit: [doc.shadergif.com](https://doc.shadergif.com)

To contribute to the documentation, install mkdocs. The text is in the `doc` folder.
