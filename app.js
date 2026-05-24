const { useState } = React;

const THEMES = [
  { emoji: "🌿", label: "Nature & Botanical", ideas: ["wildflower meadow", "mushroom forest floor", "tropical leaves & birds", "underwater seascape", "mountain sunrise", "enchanted garden"] },
  { emoji: "🦋", label: "Animals & Wildlife", ideas: ["fox in autumn leaves", "owl on a moonlit branch", "butterflies & flowers", "koi pond from above", "elephant family", "hummingbird & roses"] },
  { emoji: "🏰", label: "Fantasy & Magical", ideas: ["fairy cottage", "dragon on a mountain", "mermaid cove", "wizard's tower", "enchanted forest path", "castle in the clouds"] },
  { emoji: "🏡", label: "Cozy Scenes", ideas: ["cottage kitchen", "reading nook by fireplace", "bakery storefront", "garden tea party", "treehouse interior", "rainy window café"] },
  { emoji: "🎪", label: "Whimsical & Fun", ideas: ["hot air balloon festival", "circus big top", "gingerbread village", "toy shop window", "carnival at night", "floating sky islands"] },
  { emoji: "🌍", label: "Around the World", ideas: ["Moroccan marketplace", "Japanese pagoda garden", "Parisian street scene", "Venetian canal", "Indian palace courtyard", "Mayan ruins"] },
  { emoji: "🎄", label: "Seasonal", ideas: ["autumn harvest pumpkins", "winter village", "spring blossom park", "summer beach day", "Christmas morning", "Halloween night street"] },
  { emoji: "✨", label: "Mandala & Abstract", ideas: ["floral mandala", "geometric star burst", "nature mandala", "paisley pattern", "Celtic knotwork border", "zentangle landscape"] },
];

const PRESETS = {
  style: [
    "Art Nouveau — flowing organic lines and decorative flourishes",
    "Whimsical cartoon — bold outlines, playful and fun",
    "Realistic detailed — fine lines, true-to-life proportions",
    "Chibi / kawaii — oversized heads, cute simplified features",
    "Zentangle — repetitive intricate patterns filling every space",
    "Mandala — radial symmetry with geometric and floral elements",
    "Storybook illustration — warm, classic fairy tale feel",
    "Flat design — clean shapes, minimal detail, modern look",
    "Steampunk — gears, cogs, Victorian machinery details",
    "Watercolor-inspired — soft flowing shapes with delicate linework",
    "Comic book — dynamic poses, strong shadows, bold outlines",
    "Botanical scientific — precise, labeled, naturalist illustration",
    "Folk art — decorative patterns, symmetry, cultural motifs",
    "Minimalist — simple clean lines, generous white space",
    "Gothic — ornate, dark, architectural, dramatic details",
    "Vintage retro — mid-century modern, nostalgic feel",
    "Geometric — shapes, angles, tessellations, structured patterns",
    "Impressionist — loose expressive strokes, atmospheric feel",
    "Japanese woodblock — bold flat shapes, strong outlines",
    "Celtic knotwork — interwoven endless knot patterns",
    "Art Deco — bold geometry, symmetry, glamorous details",
    "Surrealist — dreamlike, unexpected combinations of elements",
    "Naive / folk primitive — simple childlike charming style",
    "Pointillist — image built from dots and small shapes",
    "Mixed media collage — layered textures and varied elements",
  ],
  pose: [
    "Standing tall, facing forward with confident posture",
    "Sitting peacefully, gazing into the distance",
    "Mid-flight or leaping through the air with energy",
    "Curled up sleeping or resting in a cozy position",
    "Looking over the shoulder with a curious expression",
    "Reaching upward toward something just out of grasp",
    "Running or racing at full speed",
    "Dancing gracefully with arms outstretched",
    "Hiding or peeking around a corner or behind an object",
    "Crouching low, alert and ready to spring",
    "Floating gently as if weightless",
    "Stretching wide, taking up the whole frame",
    "Hugging or nuzzling another character or object",
    "Reading or studying, deeply focused",
    "Playing a musical instrument with joy",
    "Cooking or baking, surrounded by ingredients",
    "Gardening or tending to plants with care",
    "Climbing a tree, ladder, or rocky surface",
    "Sitting cross-legged in meditation",
    "Carrying a heavy or oversized load with effort",
    "Pointing dramatically at something off-frame",
    "Waving hello with a big friendly smile",
    "Celebrating with arms raised in triumph",
    "Tiptoeing carefully and quietly",
    "Looking up in wonder at a vast sky or scene above",
  ],
  background: [
    "Dense enchanted forest with twisted ancient trees",
    "Rolling meadow filled with wildflowers in full bloom",
    "Cozy cottage interior with fireplace and warm lighting",
    "Dramatic mountain range with snow-capped peaks",
    "Calm ocean beach at sunset with gentle waves",
    "Starry night sky filled with constellations and a full moon",
    "Busy marketplace with stalls, banners, and crowds",
    "Underwater coral reef teeming with sea life",
    "Misty foggy moorland stretching to the horizon",
    "Lush tropical rainforest with waterfalls and exotic birds",
    "Snowy winter village with lanterns glowing warmly",
    "Ancient stone ruins overgrown with vines and moss",
    "Floating sky islands connected by rope bridges",
    "Victorian city street with gas lamps and cobblestones",
    "Magical library with floor-to-ceiling bookshelves",
    "Lavender field stretching into the distance",
    "Autumn forest with red, gold, and orange falling leaves",
    "Japanese cherry blossom garden in full bloom",
    "Desert landscape with sand dunes and a blazing sun",
    "Cliffside overlooking a vast stormy sea",
    "Space scene with planets, stars, and nebulae",
    "Cozy bakery interior with fresh bread and pastries",
    "Garden maze with hedgerows and hidden fountains",
    "Moonlit pond surrounded by weeping willows",
    "Carnival or fair at night with string lights glowing",
  ],
  mood: [
    "Peaceful and serene — quiet, calming, still",
    "Magical and enchanting — full of wonder and mystery",
    "Cozy and warm — safe, inviting, snug",
    "Adventurous and exciting — bold, dynamic, energetic",
    "Mysterious and eerie — shadowy, suspenseful, unknown",
    "Joyful and playful — bright, fun, lighthearted",
    "Romantic and dreamy — soft, gentle, wistful",
    "Epic and grand — vast, powerful, awe-inspiring",
    "Melancholic and reflective — bittersweet, thoughtful",
    "Festive and celebratory — lively, colorful, jubilant",
    "Spooky but fun — Halloween-style, not truly scary",
    "Nostalgic and vintage — old-fashioned, sentimental",
    "Dark and dramatic — intense, brooding, moody",
    "Whimsical and silly — absurd, funny, lighthearted",
    "Sacred and spiritual — reverent, meditative, holy",
    "Wild and untamed — raw nature, primal, free",
    "Hopeful and uplifting — optimistic, bright, forward-looking",
    "Mysterious and ancient — timeless, forgotten, wise",
    "Cute and sweet — adorable, innocent, charming",
    "Tense and suspenseful — on the edge, uncertain",
    "Ethereal and otherworldly — dreamlike, floating, surreal",
    "Rustic and earthy — natural, simple, grounded",
    "Luxurious and opulent — rich, detailed, indulgent",
    "Cheerful and sunny — warm daylight, happy, bright",
    "Haunting and beautiful — deeply moving, bittersweet",
  ],
};

const PRESET_LABELS = {
  style: "Art Style",
  pose: "Pose / Action / Detail",
  background: "Background Elements",
  mood: "Mood / Atmosphere",
};

const QUALITY_CHECKLIST = [
  { category: "Composition", items: [
    "Clear focal point — the eye knows where to look first",
    "Background, midground, and foreground are all defined",
    "No large empty \"dead\" zones unless intentionally negative space",
    "Edges of the scene feel complete, not cut off awkwardly",
  ]},
  { category: "Line Work", items: [
    "All lines are closed — no gaps where color would \"leak\" out",
    "Line weights vary (thicker outlines, thinner interior details)",
    "No extremely thin slivers that would be impossible to color",
    "Details are sized for a crayon/marker, not just a fine pen",
  ]},
  { category: "Human & Animal Anatomy", items: [
    "Count all limbs — humans have 2 arms, 2 legs; verify before finalizing",
    "Hands are either clearly drawn or tastefully hidden/simplified",
    "Faces are symmetrical (unless stylized intentionally)",
    "Bodies have correct proportions for the chosen style",
    "No floating body parts disconnected from the torso",
    "Clothing folds make physical sense on the body",
  ]},
  { category: "Objects & Props", items: [
    "Furniture/objects follow basic perspective rules",
    "No objects that appear to float without shadow or context",
    "Repeated elements are consistent in style",
    "Text or signage in the scene is legible or stylized intentionally",
  ]},
  { category: "Prompt Clarity (for AI generation)", items: [
    "Specify line art / black and white outline only",
    "State: coloring book page, no shading, no grey fills",
    "Mention: clean bold outlines, white interior spaces",
    "Describe foreground subject + background elements separately",
    "Include style cue (e.g., whimsical, realistic, Art Nouveau, cartoon)",
    "Add negative prompt: no color, no shading, no watermark, no extra limbs",
  ]},
];

const PROMPT_TEMPLATE = `A coloring book page of [SUBJECT] in a [STYLE] style. [SUBJECT] is [POSE]. The background includes [BACKGROUND]. The scene has [MOOD]. Black and white line art only, clean bold outlines, white interior spaces, no shading, no gray fills, no color, no watermark. All figures have correct anatomy.`;

const inputStyle = {
  width: "100%", padding: "8px 10px", borderRadius: 8,
  border: "1.5px solid #ccc", fontFamily: "Georgia, serif",
  fontSize: 13, boxSizing: "border-box", background: "transparent", color: "#2c2c2c"
};

const selectStyle = {
  ...inputStyle, cursor: "pointer", appearance: "none",
  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23888' d='M6 8L1 3h10z'/%3E%3C/svg%3E")`,
  backgroundRepeat: "no-repeat", backgroundPosition: "right 10px center", paddingRight: 30,
};

function PresetField({ fieldKey, presets, value, setValue, custom, setCustom }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <label style={{ fontSize: 13, fontWeight: "bold", display: "block", marginBottom: 4 }}>
        {PRESET_LABELS[fieldKey]}
      </label>
      <select
        value={custom ? "__custom__" : (value || "")}
        onChange={e => {
          if (e.target.value === "__custom__") { setCustom(true); setValue(""); }
          else { setCustom(false); setValue(e.target.value); }
        }}
        style={selectStyle}
      >
        <option value="">— Choose a preset —</option>
        {presets.map((p, i) => <option key={i} value={p}>{p}</option>)}
        <option value="__custom__">✏️ Type my own...</option>
      </select>
      {custom && (
        <input value={value} onChange={e => setValue(e.target.value)}
          placeholder={`Describe your own ${PRESET_LABELS[fieldKey].toLowerCase()}...`}
          style={{ ...inputStyle, marginTop: 6 }} autoFocus />
      )}
      {!custom && value && (
        <div style={{ marginTop: 5, fontSize: 12, color: "#888", fontStyle: "italic", paddingLeft: 4 }}>
          Selected: {value.split("—")[0].trim()}
        </div>
      )}
    </div>
  );
}

function App() {
  const [selectedTheme, setSelectedTheme] = useState(null);
  const [selectedIdea, setSelectedIdea] = useState("");
  const [customIdea, setCustomIdea] = useState("");
  const [tab, setTab] = useState("brainstorm");
  const [checked, setChecked] = useState({});
  const [style, setStyle] = useState("");
  const [styleCustom, setStyleCustom] = useState(false);
  const [pose, setPose] = useState("");
  const [poseCustom, setPoseCustom] = useState(false);
  const [background, setBackground] = useState("");
  const [backgroundCustom, setBackgroundCustom] = useState(false);
  const [mood, setMood] = useState("");
  const [moodCustom, setMoodCustom] = useState(false);
  const [copied, setCopied] = useState(false);

  const toggleCheck = k => setChecked(prev => ({ ...prev, [k]: !prev[k] }));
  const subject = customIdea || selectedIdea;
  const clean = v => v ? v.split("—")[0].trim() : null;

  const filledPrompt = PROMPT_TEMPLATE
    .replace("[SUBJECT]", subject || "your subject")
    .replace("[SUBJECT]", subject || "your subject")
    .replace("[STYLE]", clean(style) || "your chosen style")
    .replace("[POSE]", clean(pose) || "doing something interesting")
    .replace("[BACKGROUND]", clean(background) || "relevant background details")
    .replace("[MOOD]", clean(mood) || "a fitting mood");

  const copyPrompt = () => {
    const ta = document.createElement("textarea");
    ta.value = filledPrompt;
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    document.execCommand("copy");
    document.body.removeChild(ta);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const totalChecks = QUALITY_CHECKLIST.flatMap(c => c.items).length;
  const doneChecks = Object.values(checked).filter(Boolean).length;

  const tabBtn = (key, label) => (
    <button key={key} onClick={() => setTab(key)} style={{
      flex: 1, padding: "8px 4px", borderRadius: 8, border: "2px solid",
      borderColor: tab === key ? "#2c2c2c" : "#ccc",
      background: tab === key ? "#2c2c2c" : "transparent",
      color: tab === key ? "#fdfaf6" : "#2c2c2c",
      fontFamily: "Georgia, serif", fontSize: 13, cursor: "pointer",
      fontWeight: tab === key ? "bold" : "normal"
    }}>{label}</button>
  );

  return (
    <div style={{ maxWidth: 720, margin: "0 auto", color: "#2c2c2c" }}>
      <div style={{ textAlign: "center", marginBottom: 20 }}>
        <h1 style={{ fontSize: 22, fontWeight: "bold", margin: 0 }}>🎨 Coloring Book Page Planner</h1>
        <p style={{ color: "#888", fontSize: 13, margin: "6px 0 0" }}>Brainstorm themes · Build your prompt · Quality-check before you generate</p>
        <p style={{ color: "#aaa", fontSize: 11, margin: "4px 0 0" }}>© RLB Designs — included with The Coloring Book Launchpad</p>
      </div>

      <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
        {[["brainstorm","💡 Brainstorm"],["build","✏️ Build Prompt"],["checklist","✅ Quality Check"]].map(([k,l]) => tabBtn(k,l))}
      </div>

      {/* BRAINSTORM */}
      {tab === "brainstorm" && (
        <div>
          <p style={{ fontSize: 13, marginBottom: 12, color: "#888" }}>Pick a theme category, then click an idea — or type your own below.</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 16 }}>
            {THEMES.map(t => (
              <button key={t.label} onClick={() => setSelectedTheme(selectedTheme?.label === t.label ? null : t)}
                style={{
                  padding: "8px 10px", borderRadius: 8, border: "2px solid",
                  borderColor: selectedTheme?.label === t.label ? "#2c2c2c" : "#ccc",
                  background: selectedTheme?.label === t.label ? "#2c2c2c" : "transparent",
                  color: selectedTheme?.label === t.label ? "#fdfaf6" : "#2c2c2c",
                  fontFamily: "Georgia, serif", fontSize: 13, cursor: "pointer", textAlign: "left"
                }}>{t.emoji} {t.label}</button>
            ))}
          </div>
          {selectedTheme && (
            <div style={{ background: "#f3ede4", borderRadius: 10, padding: 14, marginBottom: 16 }}>
              <p style={{ fontWeight: "bold", margin: "0 0 8px", fontSize: 13 }}>{selectedTheme.emoji} {selectedTheme.label} — click an idea:</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {selectedTheme.ideas.map(idea => (
                  <button key={idea} onClick={() => { setSelectedIdea(idea); setCustomIdea(""); }}
                    style={{
                      padding: "5px 10px", borderRadius: 20, border: "1.5px solid",
                      borderColor: selectedIdea === idea && !customIdea ? "#2c2c2c" : "#aaa",
                      background: selectedIdea === idea && !customIdea ? "#2c2c2c" : "transparent",
                      color: selectedIdea === idea && !customIdea ? "#fdfaf6" : "#2c2c2c",
                      fontFamily: "Georgia, serif", fontSize: 12, cursor: "pointer"
                    }}>{idea}</button>
                ))}
              </div>
            </div>
          )}
          <div style={{ marginBottom: 12 }}>
            <label style={{ fontSize: 13, fontWeight: "bold", display: "block", marginBottom: 4 }}>✍️ Or type your own idea:</label>
            <input value={customIdea} onChange={e => { setCustomIdea(e.target.value); setSelectedIdea(""); }}
              placeholder="e.g. a cat librarian surrounded by floating books..."
              style={inputStyle} />
          </div>
          {subject && (
            <div style={{ background: "#f3ede4", borderRadius: 10, padding: 12, fontSize: 13 }}>
              <strong>Selected idea:</strong> {subject}<br />
              <span style={{ color: "#888" }}>→ Head to the <em>Build Prompt</em> tab to flesh it out!</span>
            </div>
          )}
        </div>
      )}

      {/* BUILD PROMPT */}
      {tab === "build" && (
        <div>
          <p style={{ fontSize: 13, color: "#888", marginBottom: 14 }}>Choose a preset from each dropdown or select "Type my own" for custom input.</p>
          <div style={{ marginBottom: 14 }}>
            <label style={{ fontSize: 13, fontWeight: "bold", display: "block", marginBottom: 4 }}>Subject / Idea</label>
            <div style={{ padding: "8px 10px", borderRadius: 8, border: "1.5px dashed #ccc", fontSize: 13, color: subject ? "#2c2c2c" : "#888" }}>
              {subject || "← Set in Brainstorm tab"}
            </div>
          </div>
          <PresetField fieldKey="style" presets={PRESETS.style} value={style} setValue={setStyle} custom={styleCustom} setCustom={setStyleCustom} />
          <PresetField fieldKey="pose" presets={PRESETS.pose} value={pose} setValue={setPose} custom={poseCustom} setCustom={setPoseCustom} />
          <PresetField fieldKey="background" presets={PRESETS.background} value={background} setValue={setBackground} custom={backgroundCustom} setCustom={setBackgroundCustom} />
          <PresetField fieldKey="mood" presets={PRESETS.mood} value={mood} setValue={setMood} custom={moodCustom} setCustom={setMoodCustom} />
          <div style={{ background: "#f3ede4", borderRadius: 10, padding: 14, marginTop: 4 }}>
            <p style={{ fontWeight: "bold", margin: "0 0 8px", fontSize: 13 }}>📋 Your Generated Prompt:</p>
            <p style={{ fontSize: 13, lineHeight: 1.6, margin: 0, fontStyle: "italic" }}>{filledPrompt}</p>
            <button onClick={copyPrompt} style={{
              marginTop: 10, padding: "6px 14px", borderRadius: 8,
              border: "1.5px solid #2c2c2c", background: copied ? "#2c2c2c" : "transparent",
              color: copied ? "#fdfaf6" : "#2c2c2c",
              fontFamily: "Georgia, serif", fontSize: 12, cursor: "pointer", transition: "all 0.2s"
            }}>{copied ? "✅ Copied!" : "Copy Prompt"}</button>
          </div>
        </div>
      )}

      {/* CHECKLIST */}
      {tab === "checklist" && (
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
            <p style={{ fontSize: 13, color: "#888", margin: 0 }}>Check off each item before finalizing your image.</p>
            <span style={{ fontSize: 13, fontWeight: "bold", padding: "4px 10px", borderRadius: 20, background: doneChecks === totalChecks ? "#4caf50" : "#eee", color: doneChecks === totalChecks ? "white" : "#2c2c2c" }}>
              {doneChecks}/{totalChecks}
            </span>
          </div>
          {QUALITY_CHECKLIST.map(cat => (
            <div key={cat.category} style={{ marginBottom: 16 }}>
              <h3 style={{ fontSize: 14, fontWeight: "bold", margin: "0 0 8px", borderBottom: "1px solid #ddd", paddingBottom: 4 }}>{cat.category}</h3>
              {cat.items.map(item => {
                const k = cat.category + item;
                return (
                  <label key={item} style={{ display: "flex", alignItems: "flex-start", gap: 8, marginBottom: 8, cursor: "pointer" }}>
                    <input type="checkbox" checked={!!checked[k]} onChange={() => toggleCheck(k)}
                      style={{ marginTop: 2, width: 15, height: 15, flexShrink: 0, cursor: "pointer" }} />
                    <span style={{ fontSize: 13, lineHeight: 1.5, textDecoration: checked[k] ? "line-through" : "none", color: checked[k] ? "#888" : "#2c2c2c" }}>{item}</span>
                  </label>
                );
              })}
            </div>
          ))}
          {doneChecks === totalChecks && (
            <div style={{ background: "#e8f5e9", borderRadius: 10, padding: 14, textAlign: "center", color: "#2e7d32", fontWeight: "bold", fontSize: 14 }}>
              🎉 All checks passed! Your image is ready to finalize.
            </div>
          )}
          <button onClick={() => setChecked({})} style={{ marginTop: 8, padding: "6px 14px", borderRadius: 8, border: "1.5px solid #ccc", background: "transparent", color: "#888", fontFamily: "Georgia, serif", fontSize: 12, cursor: "pointer" }}>
            Reset Checklist
          </button>
        </div>
      )}
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(React.createElement(App));