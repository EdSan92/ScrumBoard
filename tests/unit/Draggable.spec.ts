import { shallowMount } from "@vue/test-utils";
import Draggable from "@/components/Draggable.vue";

describe("Draggable.vue", () => {
  it("renders", () => {
    const type = "stickies"
    const wrapper = shallowMount(Draggable, {
      props: { type }
    });
    expect(wrapper.vm).toBeTruthy()
  });
  it("mousedown should call dragMouseDown", async () => {
    const type = "stickies"
    const wrapper = shallowMount(Draggable, {
      props: { type }
    });
    wrapper.vm.dragMouseDown = jest.fn()
    await wrapper.find('button').trigger('mousedown')
    expect(wrapper.vm.dragMouseDown).toBeCalled()
  });
});
