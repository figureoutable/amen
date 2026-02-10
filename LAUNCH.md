# How to open your app

1. **Open the Terminal in Cursor**  
   - Bottom of the window: click the **Terminal** tab,  
   - or menu: **View → Terminal**,  
   - or shortcut: **Ctrl + `** (Windows) / **Cmd + `** (Mac).

2. **In the terminal, type this and press Enter:**
   ```
   npm run dev
   ```

3. **Wait** until you see a line like:
   - `Ready in 3s`
   - or `✓ Compiled`

4. **Open Chrome** (or any browser) and go to:
   ```
   http://localhost:3000
   ```

5. **Leave the Terminal open.** If you close it or press Ctrl+C, the app will stop and the page won’t load again until you run `npm run dev` again.

---

**If it says "port 3000 is in use"**  
- Close any other Cursor terminal that might be running the app, or  
- Restart Cursor and run `npm run dev` again.
