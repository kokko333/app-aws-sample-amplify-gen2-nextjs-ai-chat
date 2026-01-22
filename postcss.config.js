// next.js でビルド時に参照される
module.exports = {
  plugins: {
    tailwindcss: {}, // TailwindでCSSを生成
    autoprefixer: {}, // ベンダープレフィックスを付与するなどしてブラウザ互換性を向上
  },
};
