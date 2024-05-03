import type { Meta, StoryFn, StoryObj } from '@storybook/react';

import { IMovieCard } from './types';
import MovieCard from './MovieCard';
import React from 'react';

const meta = {
    title: 'Components/MovieCard',
    components: MovieCard,
    parameters: {
        layout: 'centered',
        docs: {
            story: {
                inline: false,
                description: "A MovieCard component",
                iframeHeight: 400,
            }
        }

    },
    argTypes: {
        title: { control: 'text' },
        genreId: { control: 'number' },
        movieId: { control: 'number' },
        rating: { control: 'number' },
        posterPath: { control: 'text' },
    },
    tags: ["autodoocs"],
} as Meta;

export default meta;

const Template: StoryFn<IMovieCard> = (args) => <MovieCard {...args} />;

/* Default story of MovieCard*/

export const Default = Template.bind({});
Default.args = {
    title: 'The Super Mario Bros. Movie',
    genreId: 16,
    movieId: 502356,
    voteAverage: 7.5,
    posterPath: '/qNBAXBIQlnOThrVvA6mA2B5ggV6.jpg',
};


