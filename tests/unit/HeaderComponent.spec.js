import { shallowMount } from '@vue/test-utils';
import SearchBarComponent from '@/components/SearchBarComponent.vue';
import { VTextField, VList, VListItem, VListItemTitle, VRow } from 'vuetify/lib';

describe('SearchBarComponent with Static Data', () => {
  let wrapper;
  const searchData = [
    { name: 'IPSA', code: 'IPSA' },
    { name: 'CAP', code: 'CAP' },
    { name: 'BSANTANDER', code: 'BSANTANDER' },
    { name: 'BCI', code: 'BCI' },
    { name: 'ANDINA-B', code: 'ANDINA-B' },
    { name: 'AGUAS-A', code: 'AGUAS-A' },
  ];

  beforeEach(() => {
    wrapper = shallowMount(SearchBarComponent, {
      propsData: {
        searchData: searchData,
      },
      components: {
        VTextField,
        VList,
        VListItem,
        VListItemTitle,
        VRow,
      },
    });
  });

  it('renders the search input', () => {
    const input = wrapper.find('.search-input');
    expect(input.exists()).toBe(true);
  });

  it('filters instruments based on search input', async () => {
    await wrapper.setData({ search: 'IP' });
    await wrapper.vm.$nextTick();
    const suggestions = wrapper.findAll('.v-list-item');
    expect(suggestions.length).toBe(1);
    expect(suggestions[0].text()).toContain('IPSA');
  });

  it('selects an instrument and clears the search input', async () => {
    await wrapper.setData({ search: 'CAP' });
    await wrapper.vm.$nextTick();
    const suggestions = wrapper.findAll('.v-list-item');
    await suggestions[0].trigger('click');
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.search).toBe('');
  });
});