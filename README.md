# TailBlazer - Lost Animal Reporting System

## About the Application

TailBlazer is a React-based web application designed to help communities track and recover lost pets. Built with TypeScript and Vite, it provides an interactive dashboard where users can view reported animals on a map or as a list of cards.

### How it Works

- **Interactive Map & Dashboard:** Users can view pins on a Leaflet map indicating where an animal was last seen. The dashboard allows filtering by the animal's status ("Lost" or "Found") and by species type.
- **Submitting a Report:** Users can submit a new report by filling out a form with the pet's details.
  - The last seen location is selected by clicking on an interactive map, which reverse-geocodes the coordinates into a human-readable address using the Nominatim API.
  - Photos are uploaded and hosted via the ImgBB API.
- **Data Persistence & Security:** Reports are saved to a shared JSONbin.io database. When submitting a report, users set a password which is securely hashed using SHA-256 before being stored. This password is later required to authenticate the user if they wish to update the pet's status to "Found".

---

## Setup Instructions

1. **Clone the repository** to your local machine.
2. **Install dependencies:** Open your terminal in the project directory and run:
   ```bash
   npm install
   ```
3. **Configure Environment Variables:** You must set up your API keys for the backend services to work. Create a new file in the root of the project folder named exactly `.env`.

   Add the following lines to your `.env` file, replacing the placeholder text with your actual API keys:

   ```env
   VITE_JSONBIN_KEY=your_jsonbin_master_key_here
   VITE_BIN_ID=your_jsonbin_bin_id_here
   VITE_IMGBB_KEY=your_imgbb_api_key_here
   ```

   _(Note: The JSONbin variables are required for reading/writing reports, and the ImgBB variable is required for image uploading.)_

4. **Start the Development Server:**
   ```bash
   npm run dev
   ```
   Open the provided local URL.

---

## AI Usage Disclosure

**UI Mockup:** Google Stitch
**Debugging & Guidance:** I used both Claude and Google Gemini for support in debugging and also guidance regarding more complex features. For example, when a user clicks on a pin, it will highlight the respective card and vice versa. I also used AI to help guide and structure my approach to this assignemt, including the suggested file structure, as I have never worked on a project this complex.
