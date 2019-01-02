import moment from "moment";

export default class User {
    /**
     * @constructor
     * @param {Object} attributes
     * @param {number} attributes.id
     * @param {string} attributes.name
     * @param {number} attributes.expiresAt
     */
    constructor({id, name, expiresAt}) {
        this.id = id;
        this.name = name;
        this.expiresAt = expiresAt;
        this.clone = this.clone.bind(this);
    }

    /**
     * @return {User}
     */
    clone() {
        return new User({
            id: this.id,
            name: this.name,
            expiresAt: this.expiresAt,
        });
    }
}

/**
 * @param {Object} object
 * @return {User}
 */
User.fromObject = function fromObject(object) {
    const expiresAt = moment.utc(object.expiresAt);
    return new User({
        id: object.id,
        name: object.name,
        expiresAt,
    });
};
