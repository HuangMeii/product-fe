import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "images.unsplash.com", //  cho phép tải ảnh từ Unsplash
      "cdn.tgdd.vn",         // (tùy chọn) nếu bạn dùng ảnh từ Thế Giới Di Động
      "i.imgur.com"          // (tùy chọn) nếu bạn dùng ảnh từ Imgur
    ],
  },
};

export default nextConfig;
