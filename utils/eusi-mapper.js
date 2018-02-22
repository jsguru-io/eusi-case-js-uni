
const formatter = require('./eusi-formatter');

const getFormatter = (format) => {
    switch (format) {
        case 'date':
            return formatter.date;
    }
}

class Mapper {

    static create(context) {
        return context.data ? new ListMapper(context) : new SingleMapper(context);
    }
}

class ListMapper {

    constructor(context) {
        this.context = context || {};
    }

    list() {
        let data = this.context.data = this.context.data || [];

        let result = [];

        data.forEach((entry) => {
            result.push(new SingleMapper(entry));
        });

        return result;
    }
}

class SingleMapper {

    constructor(context) {
        this.context = context;
    }


    content() {
        return new Content(this.context.content);
    }
}

class Content {

    constructor(content) {
        this.content = content;
    }

    prop(type) {
        return this.content.filter((item) => {
            return item.type === type;
        })[0];
    }

    value(type, format) {
        let val = this.propOrEmpty(type).value;

        if(format) {
            let formatterFn = getFormatter(format);
            val = formatterFn(val);
        }

        return val;
    }

    propOrEmpty(type) {
        return this.prop(type) || {};
    }

    media(type) {
        return new Media(this.propOrEmpty(type).media);
    }
}

class Media {

    constructor(media) {

        if(media) {
            media.forEach((entry) => {
                Object.assign(entry, {
                    embed: entry.url.replace('watch?v=', 'embed/')
                })
            });
        }

        this.media = media;
    }

    first() {
        return this.media ? this.media[0] : {};
    }
}

module.exports = Mapper;