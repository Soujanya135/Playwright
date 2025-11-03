import{test,expect}from '@playwright/test'

test('API GET test',async({request})=>{
    const response=await request.get("https://reqres.in/api/users/2")
    await expect(response.status()).toBe(200)
    const text=await response.text()
    await expect(text).toContain("fuchsia rose")
    const data= await response.json()
    console.log(data);
})

test('API POST test',async({request})=>{
    const response1=await request.post("https://reqres.in/api/users",{
        data:{
            "name": "morpheus",
            "job": "leader"
        }
    })
 expect(response1.status()).toBe(201)
const text1=await response1.text()
await expect(text1).toContain("leader")
const data1=await response1.json()
console.log(data1)
expect(data1.name).toBe("morpheus")

})