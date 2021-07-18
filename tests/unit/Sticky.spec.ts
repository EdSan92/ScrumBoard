import { shallowMount } from "@vue/test-utils";
import Sticky from "@/components/Sticky.vue";

describe("Sticky.vue", () => {
  it("renders", () => {
    const sticky = {
      color: "#FFFFFF",
      id: "78d9b20b-a62c-49b7-9426-01320b50be24",
      left: "888px",
      order: 2,
      text: "1",
      top: "121px"
    }
    const wrapper = shallowMount(Sticky, {
      props: { sticky }
    });
    expect(wrapper.vm).toBeTruthy()
  });
  it("button should call updateSticky", async () => {
    const sticky = {
      color: "#FFFFFF",
      id: "78d9b20b-a62c-49b7-9426-01320b50be24",
      left: "888px",
      order: 2,
      text: "1",
      top: "121px"
    }
    const wrapper = shallowMount(Sticky, {
      props: { sticky }
    });
    wrapper.vm.updateSticky = jest.fn()
    await wrapper.findAll('button')[0].trigger('click')
    expect(wrapper.vm.updateSticky).toBeCalled()
  });
  it("button should call deleteSticky", async () => {
    const sticky = {
      color: "#FFFFFF",
      id: "78d9b20b-a62c-49b7-9426-01320b50be24",
      left: "888px",
      order: 2,
      text: "1",
      top: "121px"
    }
    const wrapper = shallowMount(Sticky, {
      props: { sticky }
    });
    wrapper.vm.deleteSticky = jest.fn()
    await wrapper.findAll('button')[1].trigger('click')
    expect(wrapper.vm.deleteSticky).toBeCalled()
  });
});
