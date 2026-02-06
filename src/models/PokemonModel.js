export class PokemonModel {
    constructor(data) {
        this.id = data.id;
        this.name = this.formatName(data.name);
        this.sprite = data.sprites?.front_default;
        this.hdSprite = data.sprites?.other?.home?.front_default;
        this.types = data.types?.map(t => t.type.name) || [];
        this.stats = data.stats || [];
        this.cry = data.cries?.latest || null;
    }

    formatName(name) {
        return name.charAt(0).toUpperCase() + name.slice(1);
    }

    getFormattedId() {
        return `#${String(this.id).padStart(3, '0')}`;
    }
}