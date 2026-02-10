# How to open your app

**Pick one way. Use it every time you want to use the app.**

---

## 1. Double‑click (Mac – easiest)

1. Open **Finder** and go to your **Amen** folder (where this file lives).
2. **Double‑click** **Start Amen.command**.
   - First time only: if Mac says it’s from an “unidentified developer”, **right‑click** the file → **Open** → **Open** again.
3. A Terminal window will open and the app will start. Your browser should open to the app after a few seconds.
4. **Leave that Terminal window open** while you use the app. If you close it, the app stops.

---

## 2. Cursor – open in browser (if 1 doesn’t work)

If you use **Cursor** and the app is in a Cursor workspace, the server might be running “inside” Cursor. You need to open the app through Cursor’s port forwarding:

1. In Cursor, run the app: menu **Run** → **Run Task…** → **Start app**. Wait until you see something like **Local: http://0.0.0.0:3000**.
2. Open the **Ports** view: menu **View** → **Ports** (or click the “Ports” tab in the bottom panel).
3. Find port **3000** in the list. Click the **globe** or **Open in Browser** next to it.
4. The app will open in your browser. Use that tab.

---

## 3. Terminal (manual)

1. Open **Terminal** (Mac) or **Command Prompt** (Windows).
2. Go to the Amen folder, for example:
   - Mac: `cd ~/Documents/Amen`
   - (Use your real path if it’s different.)
3. Run: `npm run dev`
4. Wait until you see **Local: http://0.0.0.0:3000** or **Ready**.
5. In your browser, go to: **http://localhost:3000**
6. **Leave the Terminal window open** while you use the app.

---

## Why it wasn’t working before

- The app has to be **running** (a small server process) for the page to load. If that process isn’t running, or it’s running somewhere your browser can’t reach, you get “can’t connect” or “refused.”
- In Cursor, the terminal (and the server) can be on a **remote** or **different** environment. Then **localhost:3000** in your browser points at your computer, but the server is elsewhere. Using **Ports** → port 3000 → **Open in Browser** in Cursor fixes that by forwarding the right port.
- The server is now set to listen on **0.0.0.0**, so it works with Cursor’s port forwarding and with the double‑click **Start Amen.command** when you run it from your Mac.

---

## You’ll know it’s working when

You see a page with **“more than words”** and **“Clarity for every verse”** and a search box. That’s the app.
