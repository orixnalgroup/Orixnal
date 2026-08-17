import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Modality } from "@google/genai";
import dotenv from "dotenv";
import { renderOgBuffer, renderOgJpegBuffer } from "./src/server/ogGenerator";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Gemini TTS Endpoint for Insights / Founder Audio Reading
  app.post("/api/tts", async (req, res) => {
    try {
      const { text, voice } = req.body;
      if (!text || typeof text !== "string") {
        return res.status(400).json({ error: "Text string is required" });
      }

      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        return res.status(500).json({ error: "GEMINI_API_KEY environment variable is missing" });
      }

      const ai = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          },
        },
      });

      const response = await ai.models.generateContent({
        model: "gemini-3.1-flash-tts-preview",
        contents: [{ parts: [{ text: `Read with articulate, calm, confident brand strategist authority: ${text.slice(0, 800)}` }] }],
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: { voiceName: voice || "Kore" },
            },
          },
        },
      });

      const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
      if (base64Audio) {
        return res.json({ audio: base64Audio, format: "audio/wav" });
      } else {
        return res.status(500).json({ error: "No audio generated from Gemini API" });
      }
    } catch (err: any) {
      console.error("Error in /api/tts:", err);
      return res.status(500).json({ error: err.message || "Failed to generate text-to-speech audio" });
    }
  });

  // Gemini AI Chatbot Endpoint for Visitor Inquiries
  app.post("/api/chat", async (req, res) => {
    try {
      const { messages, message, tone } = req.body;
      const userPrompt = message || (Array.isArray(messages) && messages.length > 0 ? messages[messages.length - 1]?.content : "");

      if (!userPrompt || typeof userPrompt !== "string") {
        return res.status(400).json({ error: "User message string is required" });
      }

      const apiKey = process.env.GEMINI_API_KEY;
      const brandTone = tone === 'creative' ? 'creative' : 'professional';

      const toneGuidance = brandTone === 'creative'
        ? `BRAND VOICE TONE: CREATIVE & VISIONARY
- Speak as an articulate brand strategist and creative director.
- Use imaginative, vivid, and storytelling-driven language with original brand metaphors.
- Emphasize clarity, visual atmosphere, category positioning, and bold strategic vision while maintaining ORIXNAL's authority.`
        : `BRAND VOICE TONE: PROFESSIONAL & EXECUTIVE
- Speak as an authoritative, concise corporate brand consultant and legal advisor.
- Use structured, data-informed, and precise business terminology with clear executive summaries.
- Focus on unit economics, legal IP defense, operational scalability, and quantifiable market outcomes.`;

      const systemInstruction = `You are the official AI Strategic Advisor for ORIXNAL (orixnal.com) and Founder & Principal Brand Strategist Asim Khan.
Your objective is to greet visitors and prospective clients, answer all inquiries thoroughly and authoritatively, and guide them toward relevant next steps.

${toneGuidance}

ABOUT ORIXNAL:
- ORIXNAL is India's founder-led, high-conviction Brand Development Company.
- Category: Brand Development Company (Never position ORIXNAL as a creative, marketing, digital, or advertising agency).
- Tagline: Original Thinking. Human Impact.
- Led by Founder & Principal Brand Strategist Asim Khan.
- Contact: hello@orixnal.com / asim@orixnal.com | Phone: +91 8447561650
- Headquarters: ESquare Building, Plot C-2, Sector 96, Noida, Uttar Pradesh 201301, India (Meetings strictly by prior appointment).
- Philosophy: We build enduring, high-value masterbrands combining strategy, legal protection, visual identity, engineering, and GTM execution.
- Banned Words: Strictly avoid AI cliches and buzzwords ("innovative", "creative solutions", "leading", "world class", "transform", "empower", "passionate", "customer centric", "excellence", "cutting edge", "result driven", "one stop solution").

THE 8 CORE PILLARS OF ORIXNAL:
1. ORIXNAL Name: Naming strategy, company/app naming, tagline & slogan creation, domain evaluation.
2. ORIXNAL Legal: Pvt Ltd / LLP Incorporation, Trademark search & Class filings, copyright protection, IP licensing, vendor/client contract drafting, compliance.
3. ORIXNAL Studio: Logo design, visual identity systems, packaging, luxury collateral, merchandise, design tokens.
4. ORIXNAL Digital: High-performance React / Next.js web applications, custom Shopify stores, Web Vitals optimization, technical SEO.
5. ORIXNAL Marketing: Go-to-market strategy, positioning, brand architecture, retention mechanics, sales funnels.
6. ORIXNAL Ads: Targeted ad campaigns across Google, Meta, LinkedIn, billboards, TV, radio, print, and influencer integrations.
7. ORIXNAL Event: Conferences, corporate expos, stage setup, AV production, launch activations, VIP experiences.
8. ORIXNAL Consultancy: 1-on-1 Founder Advisory with Asim Khan, rebranding diagnostic audits, unit economics optimization.

GUIDELINES FOR YOUR RESPONSE:
1. Tailor your language strictly to the requested ${brandTone.toUpperCase()} brand voice tone.
2. Provide articulate, clear, and helpful answers tailored to the visitor's question.
3. CRITICAL MANDATE: EVERY SINGLE RESPONSE MUST CONCLUDE WITH A DEDICATED CALL-TO-ACTION (CTA) SECTION.

FORMATTING THE MANDATORY CTA:
At the very end of your message, always add a line break, a horizontal divider "---", followed by a section header "### ⚡ Recommended Next Steps" and include specific action recommendations with embedded CTA triggers:
Use these exact CTA trigger tags so the frontend can render clickable action buttons:
- [[CTA:BOOK_AUDIT]] Schedule a 1-on-1 Brand Audit with Founder Asim Khan
- [[CTA:EMAIL_FOUNDER]] Email Founder Asim Khan Directly (hello@orixnal.com)
- [[CTA:EXPLORE_SERVICES]] View ORIXNAL 8 Service Pillars
- [[CTA:CALCULATE_BRAND]] Calculate Your Brand Health Score`;

      if (apiKey) {
        const ai = new GoogleGenAI({
          apiKey,
          httpOptions: {
            headers: {
              "User-Agent": "aistudio-build",
            },
          },
        });

        // Format conversation history if available
        let contentsPayload: any = userPrompt;
        if (Array.isArray(messages) && messages.length > 1) {
          contentsPayload = messages.map((msg: any) => ({
            role: msg.role === "user" ? "user" : "model",
            parts: [{ text: msg.content || msg.text || "" }],
          }));
        }

        const response = await ai.models.generateContent({
          model: "gemini-3.6-flash",
          contents: contentsPayload,
          config: {
            systemInstruction,
            temperature: brandTone === 'creative' ? 0.85 : 0.65,
          },
        });

        const replyText = response.text || "";
        return res.json({
          reply: replyText,
          status: "success",
          model: "gemini-3.6-flash",
          tone: brandTone
        });
      } else {
        // Fallback intelligent responder if key is missing in dev mode
        let fallbackReply = brandTone === 'creative'
          ? `Imagine a brand that doesn't just enter a market, but crafts an undeniable culture. At ORIXNAL, we paint your vision across 8 master pillars: Name, Legal, Studio, Digital, Marketing, Ads, Event, and Consultancy.\n\nRegarding "${userPrompt}":\nFounder Asim Khan ignites brand archetypes, weaves legal IP armor into living identity systems, and engineers digital experiences that mesmerize users and dominate search indexes.\n\n---\n### ⚡ Recommended Next Steps\n- [[CTA:BOOK_AUDIT]] Schedule a 1-on-1 Brand Diagnostic Audit with Founder Asim Khan\n- [[CTA:EMAIL_FOUNDER]] Email Us Directly (hello@orixnal.com)\n- [[CTA:EXPLORE_SERVICES]] Explore ORIXNAL Service Pillars`
          : `At ORIXNAL, we specialize in transforming ambitious corporate vision into market-dominant brands across 8 core disciplines: Name, Legal, Studio, Digital, Marketing, Ads, Event, and Consultancy.\n\nRegarding your question about "${userPrompt}":\nOur founder Asim Khan works directly with enterprise leaders to structure high-conviction brand architectures, handle complete trademark legal protections, and engineer high-converting digital platforms.\n\n---\n### ⚡ Recommended Next Steps\n- [[CTA:BOOK_AUDIT]] Schedule a 1-on-1 Brand Diagnostic Audit with Founder Asim Khan\n- [[CTA:EMAIL_FOUNDER]] Email Us Directly (hello@orixnal.com)\n- [[CTA:EXPLORE_SERVICES]] Explore ORIXNAL Service Pillars`;

        return res.json({
          reply: fallbackReply,
          status: "fallback",
          model: "gemini-3.6-flash",
          tone: brandTone
        });
      }
    } catch (err: any) {
      console.error("Error in /api/chat:", err);
      // Send helpful fallback response with CTAs
      return res.status(200).json({
        reply: `Thank you for reaching out to ORIXNAL AI Strategic Advisor. We are ready to assist you with brand strategy, legal incorporation & trademarks, visual identity, or web dev.\n\n---\n### ⚡ Recommended Next Steps\n- [[CTA:BOOK_AUDIT]] Schedule a 1-on-1 Brand Audit with Founder Asim Khan\n- [[CTA:EMAIL_FOUNDER]] Send an Inquiry to hello@orixnal.com\n- [[CTA:EXPLORE_SERVICES]] View ORIXNAL 8 Service Pillars`,
        status: "error_handled",
      });
    }
  });

  // Dynamic High-Resolution 1200x630 Open Graph PNG Image Banner Endpoint
  app.get(["/api/og-image", "/api/og-image.png"], (req, res) => {
    try {
      const page = typeof req.query.page === "string" ? req.query.page : "home";
      const title = typeof req.query.title === "string" ? req.query.title : undefined;
      const subtitle = typeof req.query.subtitle === "string" ? req.query.subtitle : undefined;
      const badge = typeof req.query.badge === "string" ? req.query.badge : undefined;

      const pngBuffer = renderOgBuffer({ page, title, subtitle, badge });

      res.setHeader("Content-Type", "image/png");
      res.setHeader("Cache-Control", "public, max-age=86400, s-maxage=604800");
      return res.send(pngBuffer);
    } catch (err: any) {
      console.error("Error generating OG PNG image:", err);
      return res.status(500).send("Error generating preview image");
    }
  });

  // Dynamic High-Resolution 1200x630 Open Graph JPEG Image Banner Endpoint
  app.get("/api/og-image.jpg", async (req, res) => {
    try {
      const page = typeof req.query.page === "string" ? req.query.page : "home";
      const title = typeof req.query.title === "string" ? req.query.title : undefined;
      const subtitle = typeof req.query.subtitle === "string" ? req.query.subtitle : undefined;
      const badge = typeof req.query.badge === "string" ? req.query.badge : undefined;

      const jpgBuffer = await renderOgJpegBuffer({ page, title, subtitle, badge });

      res.setHeader("Content-Type", "image/jpeg");
      res.setHeader("Cache-Control", "public, max-age=86400, s-maxage=604800");
      return res.send(jpgBuffer);
    } catch (err: any) {
      console.error("Error generating OG JPEG image:", err);
      return res.status(500).send("Error generating preview image");
    }
  });

  // Direct route for /assets/orixnal-og.jpg and other assets with automatic fallback rendering
  app.get("/assets/orixnal-og.jpg", async (req, res) => {
    const primaryPath = path.join(process.cwd(), "public", "assets", "orixnal-og.jpg");
    const distPath = path.join(process.cwd(), "dist", "assets", "orixnal-og.jpg");
    const filePath = fs.existsSync(primaryPath) ? primaryPath : (fs.existsSync(distPath) ? distPath : null);

    if (filePath) {
      res.setHeader("Content-Type", "image/jpeg");
      res.setHeader("Cache-Control", "public, max-age=86400, s-maxage=604800");
      return res.sendFile(filePath);
    }

    try {
      const jpgBuffer = await renderOgJpegBuffer({ page: "home" });
      res.setHeader("Content-Type", "image/jpeg");
      res.setHeader("Cache-Control", "public, max-age=86400, s-maxage=604800");
      return res.send(jpgBuffer);
    } catch (err: any) {
      console.error("Error rendering on-demand orixnal-og.jpg:", err);
      return res.status(500).send("Error serving OG image");
    }
  });

  app.get(["/assets/orixnal-og.png", "/assets/og-image.png"], (req, res) => {
    const primaryPath = path.join(process.cwd(), "public", "assets", "orixnal-og.png");
    const altPath = path.join(process.cwd(), "public", "assets", "og-image.png");
    const distPath = path.join(process.cwd(), "dist", "assets", "orixnal-og.png");
    const filePath = fs.existsSync(primaryPath) ? primaryPath : (fs.existsSync(altPath) ? altPath : (fs.existsSync(distPath) ? distPath : null));

    if (filePath) {
      res.setHeader("Content-Type", "image/png");
      res.setHeader("Cache-Control", "public, max-age=86400, s-maxage=604800");
      return res.sendFile(filePath);
    }

    try {
      const pngBuffer = renderOgBuffer({ page: "home" });
      res.setHeader("Content-Type", "image/png");
      res.setHeader("Cache-Control", "public, max-age=86400, s-maxage=604800");
      return res.send(pngBuffer);
    } catch (err: any) {
      console.error("Error rendering on-demand orixnal-og.png:", err);
      return res.status(500).send("Error serving OG image");
    }
  });

  // Contact Form Submission Endpoint
  app.post("/api/contact", async (req, res) => {
    try {
      const { name, email, phone, organization, serviceInterest, message } = req.body;
      if (!name || !email || !message) {
        return res.status(400).json({ error: "Name, email, and message are required fields." });
      }

      console.log(`[ORIXNAL CONTACT LEAD] ${new Date().toISOString()}:`, {
        name,
        email,
        phone: phone || "Not provided",
        organization: organization || "Not provided",
        serviceInterest: serviceInterest || "General",
        messageSnippet: message.slice(0, 100),
      });

      return res.json({
        success: true,
        message: "Your inquiry has been received by ORIXNAL Founder Asim Khan. We will respond within 4 business hours.",
        receivedAt: new Date().toISOString(),
      });
    } catch (err: any) {
      console.error("Error in /api/contact:", err);
      return res.status(500).json({ error: "Failed to process inquiry" });
    }
  });

  // Free Brand Audit Booking Endpoint
  app.post("/api/audit-booking", async (req, res) => {
    try {
      const { name, email, phone, brandName, focusArea, preferredDate, preferredTime, notes } = req.body;
      if (!name || !email) {
        return res.status(400).json({ error: "Name and email are required fields." });
      }

      console.log(`[ORIXNAL BRAND AUDIT BOOKING] ${new Date().toISOString()}:`, {
        name,
        email,
        phone: phone || "Not provided",
        brandName: brandName || "Not provided",
        focusArea: focusArea || "Full Brand Audit & Strategy",
        preferredDate: preferredDate || "Earliest Available",
        preferredTime: preferredTime || "Flexible",
        notes: notes ? notes.slice(0, 100) : "None",
      });

      return res.json({
        success: true,
        bookingId: `ORX-AUD-${Date.now().toString().slice(-6)}`,
        message: "Your 1-on-1 Brand Audit session with Founder Asim Khan has been reserved.",
        scheduledDate: preferredDate || "Next Available Business Day",
        scheduledTime: preferredTime || "11:00 AM IST",
        meetPlatform: "Google Meet",
        receivedAt: new Date().toISOString(),
      });
    } catch (err: any) {
      console.error("Error in /api/audit-booking:", err);
      return res.status(500).json({ error: "Failed to process audit booking" });
    }
  });

  // Dynamic Sitemap XML
  app.get("/sitemap.xml", (req, res) => {
    const sitemapPath = path.join(process.cwd(), "public", "sitemap.xml");
    if (fs.existsSync(sitemapPath)) {
      res.setHeader("Content-Type", "application/xml");
      res.setHeader("Cache-Control", "public, max-age=3600");
      return res.sendFile(sitemapPath);
    }

    const baseUrl = process.env.APP_URL || "https://www.orixnal.com";
    const pages = [
      "",
      "/about",
      "/founder",
      "/services",
      "/case-studies",
      "/portfolio",
      "/insights",
      "/blog",
      "/events",
      "/industries",
      "/foooz",
      "/careers",
      "/faq",
      "/contact",
      "/privacy",
      "/terms",
    ];

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${pages
    .map(
      (page) => `
  <url>
    <loc>${baseUrl}${page}</loc>
    <lastmod>${new Date().toISOString().split("T")[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${page === "" ? "1.0" : "0.8"}</priority>
  </url>`
    )
    .join("")}
</urlset>`;

    res.header("Content-Type", "application/xml");
    res.setHeader("Cache-Control", "public, max-age=3600");
    res.send(xml);
  });

  // Robots.txt
  app.get("/robots.txt", (req, res) => {
    const robotsPath = path.join(process.cwd(), "public", "robots.txt");
    if (fs.existsSync(robotsPath)) {
      res.setHeader("Content-Type", "text/plain");
      res.setHeader("Cache-Control", "public, max-age=3600");
      return res.sendFile(robotsPath);
    }

    const baseUrl = process.env.APP_URL || "https://www.orixnal.com";
    const txt = `User-agent: *
Allow: /
Sitemap: ${baseUrl}/sitemap.xml
`;
    res.header("Content-Type", "text/plain");
    res.setHeader("Cache-Control", "public, max-age=3600");
    res.send(txt);
  });

  // LLMs AI Search Context Files
  app.get("/llms.txt", (req, res) => {
    const llmsPath = path.join(process.cwd(), "public", "llms.txt");
    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    res.setHeader("Cache-Control", "public, max-age=86400");
    return res.sendFile(llmsPath);
  });

  app.get("/llms-full.txt", (req, res) => {
    const llmsFullPath = path.join(process.cwd(), "public", "llms-full.txt");
    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    res.setHeader("Cache-Control", "public, max-age=86400");
    return res.sendFile(llmsFullPath);
  });

  // Vite development server setup
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    const VALID_CANONICAL_ROUTES = new Set([
      "",
      "about",
      "founder",
      "services",
      "case-studies",
      "portfolio",
      "insights",
      "blog",
      "events",
      "industries",
      "foooz",
      "careers",
      "faq",
      "contact",
      "privacy",
      "terms",
    ]);

    app.use(express.static(distPath));
    app.get("*all", (req, res) => {
      const cleanPath = req.path.replace(/^\//, "").replace(/\/$/, "");

      if (cleanPath === "" || VALID_CANONICAL_ROUTES.has(cleanPath)) {
        if (cleanPath) {
          const nestedIndex = path.join(distPath, cleanPath, "index.html");
          if (fs.existsSync(nestedIndex)) {
            return res.sendFile(nestedIndex);
          }
          const flatHtml = path.join(distPath, `${cleanPath}.html`);
          if (fs.existsSync(flatHtml)) {
            return res.sendFile(flatHtml);
          }
        }
        return res.sendFile(path.join(distPath, "index.html"));
      }

      // Return 404 HTTP status code for unknown direct URL requests
      const notFoundHtml = path.join(distPath, "404.html");
      if (fs.existsSync(notFoundHtml)) {
        return res.status(404).sendFile(notFoundHtml);
      }
      return res.status(404).sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`ORIXNAL Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
