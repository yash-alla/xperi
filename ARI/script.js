async function run() {  
    const data = await getData();
  
    await displayDataFunction(data, 30);
  
    const model = createModel();
    tfvis.show.modelSummary({name: 'Model Architecture'}, model);
  
    await trainModel(model, data, 20);
  
    await evaluateModel(model, data);
}
async function getDataFunction() {
    var data = new MnistData();
    await data.load();
    return data;
}