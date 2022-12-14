const { AvatarGenerator } = require("random-avatar-generator");

const generator = new AvatarGenerator();

const avatar = () => generator.generateRandomAvatar();

module.exports = avatar;
