---
title: 'How I Built My Website From Scratch (2026)'
description: 'I had a domain and almost no plan. Here is exactly how I built my own website using Astro, GitHub and Netlify, the problem that nearly stopped me, and how I fixed it.'
pubDate: 'Aug 15 2026'
heroImage: '../../assets/blog1.png'
tags: ['Tech']
---

##### How I Built My Website From Scratch (And Fixed Every Problem Along the Way)

In 2020, I was the CTO of Marble AI, where we built some genuinely cool AI enabled products. I coded almost 10 hours a day. Those were the hands on years.

Then I started ([CogniMuse](https://cognimuse.com)), and life shifted. As CEO, my days moved from code to business, marketing, finance and sales. The keyboard went quiet. I stepped away from building with my own hands.

And yet, here I am, building again.

Thanks to AI, building today is nothing like it was 6 or 7 years ago. Back then, when something broke, it meant endless searching on Google, one guess after another about what the error meant, trying fix after fix until, finally, one of them worked. I learnt to code when coding was hard. Anyway, let's get back to the topic.

So why build a website at all? Because I have notes scattered everywhere. On my Drive, in Notepad, across Obsidian. Little pieces of everything I have learnt, sitting in corners, unread. I wanted to gather them, give them a home, and give them a shape. And again, thanks to AI, writing has never felt this light. I used to struggle over a single blog for what felt like forever, and just as I reached 90 percent, I would lose interest and let it die. This website is my fix for that. A place to keep what I learn, and to share it, in case it turns out to be useful to you too.

But before a single line of code, there was a decision to make.

As a tech person, I could not just start building. There is a business layer of thinking that comes first. These are the questions a senior developer asks the junior ones before anybody touches the keyboard. And strangely, the easier building becomes, the harder it is to remember to think from the fundamentals. So I stopped and asked myself what I actually wanted:

1. Free, or close to it.
2. To own my data. Not Medium, not anyone who could one day ask me to keep paying more, or lock me out of my own words.
3. To keep a little hands on coding, even just a little.

With those three conditions in hand, I opened Claude and started to build.

## Picking the tools

Based on my conditions, here is what we landed on:

- **Astro** to build the site. It is simple, fast, and great for blogs. It also has ready made blog templates so you do not start from a blank page.
- **GitHub** to store the code online. Think of it as cloud storage made for code.
- **Netlify** to put the site live on the internet, for free.

The plan was simple:

1. Build the site on my own computer.
2. Store the code on GitHub.
3. Put it live using Netlify.
4. Connect my own domain.

I am on a MacBook Air, so all the commands below are for Mac. If you are on Windows, the idea is the same, but a few setup steps will differ.

## Step 1: Setting up the computer

First I needed a few tools installed: Homebrew (a helper that makes installing other tools easy), Node.js, and Git.

I opened the Terminal (press Command and Spacebar, type "Terminal", press Enter) and pasted this to install Homebrew:

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

It asked for my Mac password. One thing that threw me off: when you type your password here, nothing shows up on the screen. No dots, no stars. That is normal. Just type it and press Enter.

Then I installed Node.js and Git in one line:

```bash
brew install node git
```

To check everything installed correctly, I ran these:

```bash
node --version
```

```bash
git --version
```

Both printed a version number, which meant they were installed. That was the moment I felt like I could actually do this.

## Step 2: Building the site

Creating the Astro site was one command:

```bash
npm create astro@latest
```

It asked me a few questions: what to name the project, and which template to use. I picked the blog template. Then, to see it, I moved into the project folder and started it:

```bash
cd my-blog
```

```bash
npm run dev
```

It gave me an address:

```
http://localhost:4321/
```

I opened that in my browser, and there was my blog. Working. Only I could see it, because it was running on my own computer, but it existed. To stop the preview later, you click the Terminal and press Control and C.

## Step 3: Putting it online

A website only I can see is not very useful, so next I put it online.

First, I created an empty repository on GitHub (a repository is just a project folder). Important: I did not tick any of the boxes for a README or a .gitignore, because Astro already made those files.

Then I uploaded my code with these commands, one at a time. On the fourth line, you replace the address with your own repository address:

```bash
git add .
```

```bash
git commit -m "My first website"
```

```bash
git branch -M main
```

```bash
git remote add origin https://github.com/YOUR_USERNAME/my-blog.git
```

```bash
git push -u origin main
```

After this, my code was safely on GitHub.

Then I connected Netlify. I signed up at netlify.com using my GitHub account, clicked "Add new site", chose "Import an existing project", and picked my repository. Netlify detected Astro on its own and filled in the settings:

- Build command: `npm run build`
- Publish directory: `dist`

I clicked Deploy. After a minute, it gave me a live address like `something.netlify.app`. My site was live on the real internet. The best part: now every time I push new code, the site updates on its own.

## Step 4: Connecting my own domain

I bought my domain on GoDaddy. To connect it, I added the domain in Netlify, and Netlify gave me the DNS details to set up. DNS is basically the internet's phone book. It tells browsers where your domain lives.

I went into my GoDaddy settings and pointed the domain to Netlify. Then I waited, because DNS changes do not happen instantly. They spread across the internet slowly, sometimes in minutes, sometimes in hours.

## The problem that made me think I broke everything

After connecting the domain, my site opened perfectly on my phone. But on my laptop, I got this:

```
This site can't be reached
DNS_PROBE_FINISHED_NXDOMAIN
```

My first thought was that I had broken something. But the clue was this: it worked on my phone and not on my laptop. That meant the website was fine. The problem was only on my laptop.

To check what was going on, I ran this command, which asks where my domain points:

```bash
nslookup beingmj.com
```

My laptop's default service replied that it could not find it. So I asked the same question again, but this time I forced it to use Cloudflare's public service at 1.1.1.1:

```bash
nslookup beingmj.com 1.1.1.1
```

This time it returned a proper address. That was the proof. The domain was working fine. My laptop was just asking a service that had not updated yet.

## The fix

The fix was to tell my laptop to use a better DNS service. I went into System Settings, searched for DNS, and added two reliable public ones:

```
1.1.1.1
8.8.8.8
```

The first is Cloudflare, the second is Google. Then I cleared my Mac's saved lookups with this command:

```bash
sudo dscacheutil -flushcache; sudo killall -HUP mDNSResponder
```

I quit my browser fully with Command and Q, opened it again, typed my domain, and there was my site. Live, on my own domain, on my own laptop. A small bonus is that these DNS services can make your general browsing a bit faster too.

## What I took away from this

The website was not really the point. Here is what I actually learnt.

Nothing is as scary as its name. "Terminal", "DNS", "deploy". These words sound like they belong to experts. They do not. They are just steps.

Doing one step at a time beats trying to understand everything at once. I did not need to understand the whole system before starting. I just needed to do the next small thing.

Errors are clues, not walls. That red error looked like a dead end. It was actually pointing me to the answer, once I slowed down and read it properly.

And this time, I did not spend hours stuck in that old loop of searching Google and testing one fix after another. I asked, I got a direction, I tried it, and I moved on. That difference alone is why I finally have a website I own.

## Making changes once the code is on your computer

Getting the site live is not the end. It is the start. The good thing is that once the code is sitting on your computer, changing anything is simple.

The flow looks like this:

1. Open your project folder in a code editor. I use VS Code.
2. Edit whatever you want. The words, the layout, the colours, or add a new blog post.
3. Preview your changes on your own computer first by running `npm run dev` and opening `http://localhost:4321/`. Nothing goes public yet, so you can experiment freely.
4. When you are happy, save it and push it live with the same three commands each time:

```bash
git add .
```

```bash
git commit -m "Describe what you changed"
```

```bash
git push
```

That push sends your changes to GitHub, and Netlify picks them up and updates your live site on its own. Think of each commit like a save point in a game. If something breaks later, you can always go back to one.

One more thing that made this easier for me. I connected the Claude Code extension to VS Code, so I can make changes to the codebase by simply telling it what I want. Instead of hunting through files myself, I describe the change in plain words, it makes the edit right there in the project, and I review it before saving. For someone who has stepped away from daily coding like me, this is a huge help. It keeps my hands on the work without needing to remember every little detail.

## If your conditions are like mine

If you also want something that is free or cheap, that you fully own, and that lets you keep a little hands on coding, this exact setup works. Astro, GitHub, Netlify, and your own domain. Follow the steps above, one at a time, and you will get there, even if you are not doing this every day.

This article is running on the very site I just described. So I know it works.
