#The Maze Of Terrors

You may come out alive, but you won't come out the same.

##What Is It?

The Maze Of Terrors&trade; is a multiplayer game that allows players to control their icon going through a maze on a second screen.

How do they do this? Just by tilting their phone!

All you have to do is get up the maze on the second screen, enter the URL on your mobile phone. You should see on your phone that you have been assigned a colour. That colour will instantly appear on the second screen.

Tilt and make your way out.

But beware: if you have a good phone (an Android) and a good browser (Chrome), and you hit the walls, you may get a little **shock**.

##That Sounds A-maze-ing! How Do I Set It Up?

Classic Rails stuff:

	$ git clone https://github.com/pusher/pusher-maze.git
    $ cd pusher-maze
    $ bundle

Fire up your server.

    $ bin/rails s

Now get Ngrok running:

    $ ngrok -subdomain=your-subdomain-name 3000

On your big screen, visit `/maze`.

On your mobile, visit `/`.

Now... run.