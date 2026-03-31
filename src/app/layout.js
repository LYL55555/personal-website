import "./globals.css";
import "react-resizable/css/styles.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { MusicPlayerProvider } from "@/components/music-player/MusicPlayer";
import { ThemeProvider } from "@/context/ThemeContext";

export const metadata = {
  title: "Yanle (Tony) Lyu | Portfolio",
  description: "Academic and Builder Portfolio of Yanle (Tony) Lyu",
};

const noFlashStyle = `
  .no-flash {
    visibility: hidden;
  }
  html.dark {
    background: #0B0F14;
    color-scheme: dark;
  }
`;

const themeScript = `
  (function() {
    let html = document.documentElement;
    
    html.classList.add('no-flash');
    html.classList.remove('light');
    html.classList.add('dark');
    localStorage.setItem('theme', 'dark');
    localStorage.setItem('userThemeChoice', 'true');
    
    requestAnimationFrame(() => {
      html.classList.remove('no-flash');
    });
  })();
`;

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <style dangerouslySetInnerHTML={{ __html: noFlashStyle }} />
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body
        suppressHydrationWarning
        className="min-h-screen font-sans transition-colors duration-300"
      >
        <ThemeProvider>
          <MusicPlayerProvider>
            <div className="theme-color-scope flex flex-col min-h-screen relative bg-solarized-base3 dark:bg-solarized-base03 text-solarized-base01 dark:text-solarized-base1 transition-colors duration-300">
              <Navbar />
              <main className="flex-grow transition-colors duration-300">
                {children}
              </main>
              <Footer />
            </div>
          </MusicPlayerProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
