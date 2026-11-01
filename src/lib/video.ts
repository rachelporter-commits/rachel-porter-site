export type VideoInfo = { kind: "youtube" | "vimeo" | "facebook" | "tiktok" | "file" | "unknown"; id?: string; embed?: string; thumb?: string };
export function parseVideo(url: string): VideoInfo {
  let m;
  if ((m = url.match(/(?:youtube\.com\/(?:watch\?v=|shorts\/|embed\/|live\/)|youtu\.be\/)([\w-]{11})/)))
    return { kind: "youtube", id: m[1], embed: `https://www.youtube-nocookie.com/embed/${m[1]}?autoplay=1`, thumb: `https://i.ytimg.com/vi/${m[1]}/hqdefault.jpg` };
  if ((m = url.match(/vimeo\.com\/(?:video\/)?(\d+)/))) return { kind: "vimeo", id: m[1], embed: `https://player.vimeo.com/video/${m[1]}` };
  if ((m = url.match(/tiktok\.com\/.*video\/(\d+)/))) return { kind: "tiktok", id: m[1], embed: `https://www.tiktok.com/embed/v2/${m[1]}` };
  if (/facebook\.com|fb\.watch/.test(url)) return { kind: "facebook", embed: `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(url)}&show_text=false` };
  if (/\.(mp4|webm|mov)(\?|$)/i.test(url)) return { kind: "file", embed: url };
  return { kind: "unknown" };
}
