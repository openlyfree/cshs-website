// TUI Terminal Effects

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Typing effect for hero title (and other elements)
function typeWriter(element, text, speed = 50) {
  if (element.typingTimeout) {
    clearTimeout(element.typingTimeout);
  }
  let i = 0;
  element.textContent = "";
  function type() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      element.typingTimeout = setTimeout(type, speed);
    } else {
      element.typingTimeout = null;
    }
  }
  type();
}

// Add scroll animation for elements (reveal on scroll)
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

// Initialize TUI effects
document.addEventListener("DOMContentLoaded", () => {
  // Remove loading class (enabling scroll)
  document.body.classList.remove("loading");

  // Animate cards on scroll
  const animatedElements = document.querySelectorAll(
    ".accomplishment-card, .activity-card, .event-card, .member-card",
  );

  animatedElements.forEach((el, index) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(10px)";
    el.style.transition = `opacity 0.3s ease-out ${index * 0.05}s, transform 0.3s ease-out ${index * 0.05}s`;
    observer.observe(el);
  });

  // Add blinking cursor to hero title
  const heroTitle = document.querySelector(".hero-title");
  if (heroTitle) {
    const cursor = document.createElement("span");
    cursor.textContent = "█";
    cursor.style.animation = "blink 1s step-end infinite";
    cursor.style.marginLeft = "2px";
    heroTitle.appendChild(cursor);
  }

  // Add keyboard shortcut hints to nav
  const navLinks = document.querySelectorAll(".nav-menu a");
  navLinks.forEach((link, i) => {
    link.setAttribute("data-key", `F${i + 1}`);
    link.title = `Press F${i + 1}`;
  });
});

// Add active state to navigation links
window.addEventListener("scroll", () => {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-menu a");

  let current = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    if (window.scrollY >= sectionTop - 150) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    const href = link.getAttribute("href").slice(1);
    if (href === current) {
      link.style.background = "#33ff33";
      link.style.color = "#0a0a0a";
    } else {
      link.style.background = "transparent";
      link.style.color = "#33ff33";
    }
  });
});

// Keyboard navigation (TUI style)
document.addEventListener("keydown", (e) => {
  const navLinks = document.querySelectorAll(".nav-menu a");

  // F-key navigation
  if (e.key >= "F1" && e.key <= "F5") {
    e.preventDefault();
    const index = parseInt(e.key.slice(1)) - 1;
    if (navLinks[index]) {
      navLinks[index].click();
    }
  }

  // Arrow key section navigation
  if (e.key === "ArrowDown" || e.key === "ArrowUp") {
    e.preventDefault();
    const sections = Array.from(document.querySelectorAll("section"));
    const scrollY = window.scrollY;

    let currentIndex = -1;
    for (let i = 0; i < sections.length; i++) {
      if (scrollY >= sections[i].offsetTop - 100) {
        currentIndex = i;
      }
    }

    let targetIndex;
    if (e.key === "ArrowDown") {
      targetIndex = Math.min(currentIndex + 1, sections.length - 1);
    } else {
      targetIndex = Math.max(currentIndex - 1, 0);
    }

    sections[targetIndex].scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
});

console.log(
  "%c┌──────────────────────────────────────────────────────┐",
  "color: #33ff33",
);
console.log(
  "%c│  BASIS Phoenix Computer Science Honor Society v1.0  │",
  "color: #33ff33",
);
console.log(
  '%c│  Type "help" for available commands                 │',
  "color: #33ff33",
);
console.log(
  "%c└──────────────────────────────────────────────────────┘",
  "color: #33ff33",
);

// Language switching effect
document.addEventListener("DOMContentLoaded", () => {
  const heroCode = document.querySelector(".hero-code");
  const heroDescription = document.querySelector(".hero-description");

  const languages = [
    {
      code: 'print("Hello World!")',
      commentStart: '""" ',
      commentEnd: ' """',
      name: "Python",
    },
    {
      code: 'System.out.println("Hello World!");',
      commentStart: "/* ",
      commentEnd: " */",
      name: "Java",
    },
    {
      code: 'console.log("Hello World!");',
      commentStart: "/* ",
      commentEnd: " */",
      name: "JavaScript",
    },
    {
      code: 'std::cout << "Hello World!" << std::endl;',
      commentStart: "/* ",
      commentEnd: " */",
      name: "C++",
    },
    {
      code: "<h1>Hello World!</h1>",
      commentStart: "<!-- ",
      commentEnd: " -->",
      name: "HTML",
    },
    {
      code: 'printf("Hello World!");',
      commentStart: "/* ",
      commentEnd: " */",
      name: "C",
    },
    {
      code: 'Console.WriteLine("Hello World!");',
      commentStart: "/* ",
      commentEnd: " */",
      name: "C#",
    },
    {
      code: 'puts "Hello World!"',
      commentStart: "=begin ",
      commentEnd: " =end",
      name: "Ruby",
    },
    {
      code: 'fmt.Println("Hello World!")',
      commentStart: "/* ",
      commentEnd: " */",
      name: "Go",
    },
    {
      code: 'println!("Hello World!");',
      commentStart: "/* ",
      commentEnd: " */",
      name: "Rust",
    },
    {
      code: 'print("Hello World!")',
      commentStart: "/* ",
      commentEnd: " */",
      name: "Swift",
    },
    {
      code: 'echo "Hello World!";',
      commentStart: "/* ",
      commentEnd: " */",
      name: "PHP",
    },
    {
      code: 'println("Hello World!")',
      commentStart: "/* ",
      commentEnd: " */",
      name: "Kotlin",
    },
    {
      code: 'console.log("Hello World!");',
      commentStart: "/* ",
      commentEnd: " */",
      name: "TypeScript",
    },
    {
      code: 'print("Hello World!")',
      commentStart: "# ",
      commentEnd: " #",
      name: "R",
    },
    {
      code: 'print("Hello World!")',
      commentStart: "--[[ ",
      commentEnd: " ]]",
      name: "Lua",
    },
    {
      code: 'println("Hello World!")',
      commentStart: "/* ",
      commentEnd: " */",
      name: "Scala",
    },
    {
      code: "print('Hello World!');",
      commentStart: "/* ",
      commentEnd: " */",
      name: "Dart",
    },
    {
      code: 'Write-Host "Hello World!"',
      commentStart: "<# ",
      commentEnd: " #>",
      name: "PowerShell",
    },
    {
      code: "SELECT 'Hello World!';",
      commentStart: "/* ",
      commentEnd: " */",
      name: "SQL",
    },
    {
      code: "print *, 'Hello World!'",
      commentStart: "! ",
      commentEnd: " !",
      name: "Fortran",
    },
    {
      code: "DISPLAY 'HELLO WORLD!'",
      commentStart: "* ",
      commentEnd: " *",
      name: "COBOL",
    },
    {
      code: '(println "Hello World!")',
      commentStart: "; ",
      commentEnd: " ;",
      name: "Clojure",
    },
    {
      code: 'IO.puts("Hello World!")',
      commentStart: "# ",
      commentEnd: " #",
      name: "Elixir",
    },
    {
      code: 'println "Hello World!"',
      commentStart: "/* ",
      commentEnd: " */",
      name: "Groovy",
    },
    {
      code: 'Console.WriteLine("Hello World!")',
      commentStart: "' ",
      commentEnd: " '",
      name: "Visual Basic",
    },
    {
      code: 'NSLog(@"Hello World!");',
      commentStart: "/* ",
      commentEnd: " */",
      name: "Objective-C",
    },
    {
      code: "WriteLn('Hello World!');",
      commentStart: "{ ",
      commentEnd: " }",
      name: "Pascal",
    },
    {
      code: 'Put_Line("Hello World!");',
      commentStart: "-- ",
      commentEnd: " --",
      name: "Ada",
    },
    {
      code: 'writeln("Hello World!");',
      commentStart: "/* ",
      commentEnd: " */",
      name: "D",
    },
    {
      code: 'puts "Hello World!"',
      commentStart: "# ",
      commentEnd: " #",
      name: "Crystal",
    },
    {
      code: 'console.log("Hello World!");',
      commentStart: "/* ",
      commentEnd: " */",
      name: "Solidity",
    },
    {
      code: "ShowMessage('Hello World!');",
      commentStart: "{ ",
      commentEnd: " }",
      name: "Delphi",
    },
    {
      code: 'echo "Hello World!";',
      commentStart: "/* ",
      commentEnd: " */",
      name: "Hack",
    },
    {
      code: 'console.log "Hello World!"',
      commentStart: "### ",
      commentEnd: " ###",
      name: "CoffeeScript",
    },
    {
      code: 'trace("Hello World!");',
      commentStart: "/* ",
      commentEnd: " */",
      name: "ActionScript",
    },
    {
      code: "disp('Hello World!')",
      commentStart: "%{ ",
      commentEnd: " %}",
      name: "MATLAB",
    },
    {
      code: 'PRINT "Hello World!"',
      commentStart: "REM ",
      commentEnd: " REM",
      name: "BASIC",
    },
  ];

  let currentIndex = 0;

  setInterval(() => {
    currentIndex = (currentIndex + 1) % languages.length;

    heroDescription.setAttribute(
      "data-comment-start",
      languages[currentIndex].commentStart,
    );
    heroDescription.setAttribute(
      "data-comment-end",
      languages[currentIndex].commentEnd,
    );

    typeWriter(heroCode, languages[currentIndex].code, 40);
  }, 3000);
});
