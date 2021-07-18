import { shallowMount } from "@vue/test-utils";
import StickyForm from "@/components/StickyForm.vue";

describe("StickyForm.vue", () => {
  it("renders", () => {
    const id = "d8c83847-cd5d-4948-a338-3211524c1f24"
    const wrapper = shallowMount(StickyForm, {
      props: { id }
    });
    expect(wrapper.vm).toBeTruthy()
  });
});
