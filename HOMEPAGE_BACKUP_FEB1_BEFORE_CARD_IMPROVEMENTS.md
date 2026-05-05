# Homepage Backup - February 1, 2026 (Before Card Improvements)

**Status:** Production-ready, refined editorial styling
**Date:** Feb 1, 2026 @ 00:00

## Current State (Locked In):

### Directory Section:
- 3 luxury cards with refined styling
- Gold titles (text-4xl md:text-5xl, font-light, serif)
- Cards: h-80 md:h-96 lg:h-[420px]
- Frosted glass effect (backdrop-blur-xl, border-gold-500/20)
- Animated badges (top-right, scale on hover)
- Hover: shimmer effect, border glow, opacity changes
- Section CTA: "Enter the Directory →"

### Marketplace Section:
- Same 3-card structure
- Matching styling and animations
- Section CTA: "Explore the Marketplace →"

### Card Structure:
- Top: Subtitle (small gold text) + Title (large serif)
- Middle: Description (hidden, appears on hover)
- Badge: Top-right, animated scale effect
- Image: Background with gradient overlay (from-black via-black/60 to-transparent)
- Glow: Inset shadow on hover (inset 0 0 60px rgba(227,185,44,0.1))

### Animations:
- fadeInUp: staggered 0.7s, 0.2s delays
- Border glow on hover: scale-110, shadow-[0_0_30px]
- Shimmer: animate-pulse via-gold-400/20
- Image: scale-110 opacity-20 on hover

### Colors:
- Text: white, gold-300/gold-400
- Borders: gold-500/20 → gold-500/60 on hover
- Overlays: black/40, black/60, gold-500/10
- Accents: gold throughout

## What About to Change:

1. **Typography improvements:**
   - Stronger title hierarchy
   - Tighter spacing (mb-2 → mb-1 or less)
   - Bolder or different font-weight for titles

2. **Image treatment:**
   - Stronger gradient overlays for better contrast
   - Possible vignette edges
   - Better text readability on images

3. **Badge repositioning:**
   - Consider bottom-left instead of top-right
   - Or make it more integrated with design

4. **Hover effects:**
   - Smooth glow + border color shift
   - Less aggressive scale, more sophisticated
   - Possibly add gold border on hover

5. **Spacing tightening:**
   - Reduce card padding if needed
   - Tighter internal spacing for editorial feel

6. **Text positioning:**
   - Consider overlaying descriptions on image
   - Better visual hierarchy overall

7. **Color contrast:**
   - Ensure text pops against images
   - Possibly stronger shadows

## Reversion Instructions:

If card improvements don't work:
1. Replace DirectoryStoryCards function (lines ~1800-1900)
2. Replace MarketplaceStoryCards function (lines ~1948-2080)
3. Test thoroughly
4. Cards will revert to current state

## Current Line References:

- DirectoryStoryCards: Lines 1800-1935
- MarketplaceStoryCards: Lines 1948-2080
- Section CTAs: Within each function (~1920, ~2070)

---

**Status:** Ready for improvements. This backup ensures quick rollback if needed.

