export function add(x: number, y: number){
    return x + y;
}

describe('Initial test', ()=> {
    it('add function', ()=> {
        expect(add(1,3)).toEqual(4);
    })
})