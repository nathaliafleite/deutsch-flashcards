export type Noun = {
    id: string;
    accusative: {
        plural: string;
        singular: string;
    };
    dative: {
        plural: string;
        singular: string;
    };
    gender: string;
    genitive: {
        plural: string;
        singular: string;
    };
    nominative: {
        plural: string;
        singular: string;
    };
    word: string;
};

export type Verb = {
    id: string;
    infinitive: string;
    perfect: string;
    present3rd: string;
    pretrite: string;
    word: string;
};
