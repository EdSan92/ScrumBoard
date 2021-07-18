import { shallowMount } from "@vue/test-utils";
import GroupedStickies from "@/components/GroupedStickies.vue";

describe("Sticky.vue", () => {
  it("renders", () => {
    const groupedSticky = {
      id: "d8c83847-cd5d-4948-a338-3211524c1f24",
      left: "143px",
      stickies: [],
      top: "91px"
    }
    const wrapper = shallowMount(GroupedStickies, {
      props: { groupedSticky }
    });
    expect(wrapper.vm).toBeTruthy()
  });
});
