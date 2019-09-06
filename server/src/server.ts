import { Model } from '@shared/model';

let i = 0;
setInterval(() => {
    const model = new Model();
    i++;
    console.log(`Title: ${model.title} - ${i}`);
}, 1000);
