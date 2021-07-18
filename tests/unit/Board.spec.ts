import { shallowMount } from "@vue/test-utils";
import Board from "@/components/Board.vue";

describe("Board.vue", () => {
  it("renders text", () => {
    const wrapper = shallowMount(Board);
    expect(wrapper.text()).toMatch("Scrum Board New sticky");
  });
  it("creates a sticky ", () => {
    const wrapper = shallowMount(Board);
    wrapper.vm.createSticky()
    expect(wrapper.vm.stickies.value.length).toBe(1);
  });
  it("sets stickyId to null", () => {
    const wrapper = shallowMount(Board);
    wrapper.vm.saveSticky("78d9b20b-a62c-49b7-9426-01320b50be24", "Test", "#FFFFFF")
    expect(wrapper.vm.stickyId).toBe(null);
  });
  it("sets showForm to false", () => {
    const wrapper = shallowMount(Board);
    wrapper.vm.saveSticky("78d9b20b-a62c-49b7-9426-01320b50be24", "Test", "#FFFFFF")
    expect(wrapper.vm.showForm).toBe(false);
  });
  it("deletes sticky", () => {
    const wrapper = shallowMount(Board);
    wrapper.vm.deleteSticky("78d9b20b-a62c-49b7-9426-01320b50be24")
    expect(wrapper.vm.stickies.value.length).toBe(0);
  });
});
