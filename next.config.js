const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");

module.exports = (phase) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      env: {
        MONGODB_USERNAME: "mobin",
        MONGODB_PASSWORD: "z97SNif79cF3X1dx",
        DB_NAME: "next_meals",
      },

      images: {
        domains: ["firebasestorage.googleapis.com"],
      },
    };
  }

  return {
    env: {
      MONGODB_USERNAME: "mobin",
      MONGODB_PASSWORD: "z97SNif79cF3X1dx",
      DB_NAME: "next_meals",
    },
    images: {
      domains: ["firebasestorage.googleapis.com"],
    },
  };
};
